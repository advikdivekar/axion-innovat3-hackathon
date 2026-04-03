// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// ─────────────────────────────────────────────────────────────
// AXION DAO GOVERNANCE TOKEN
// ─────────────────────────────────────────────────────────────
contract AxionToken is ERC20, ERC20Permit, ERC20Votes {
    constructor()
        ERC20("Axion", "AXN")
        ERC20Permit("Axion")
    {
        // Mint 10 million tokens to deployer for distribution
        _mint(msg.sender, 10_000_000 * 10 ** decimals());
    }

    // Required overrides for diamond inheritance
    function _update(address from, address to, uint256 value)
        internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}

// ─────────────────────────────────────────────────────────────
// AXION DAO GOVERNOR CONTRACT
// ─────────────────────────────────────────────────────────────
contract AxionGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction
{
    // ── Events ───────────────────────────────────────────────
    event ThreatFlagged(uint256 indexed proposalId, string reason, address flaggedBy);
    event DAOHealthUpdated(uint256 healthScore, uint256 timestamp);

    // ── State ────────────────────────────────────────────────
    struct ProposalMetadata {
        string title;
        string category;   // "governance" | "treasury" | "security" | "operations"
        uint8  impactScore; // 0-100
        bool   isFlagged;
        string flagReason;
    }

    mapping(uint256 => ProposalMetadata) public proposalMetadata;
    mapping(address => uint256)          public contributorXP;
    mapping(address => string)           public contributorClass;
    uint256 public daoHealthScore;

    // ── Constructor ──────────────────────────────────────────
    constructor(IVotes _token)
        Governor("AxionGovernor")
        GovernorSettings(
            1 days,   // voting delay
            7 days,   // voting period
            100_000e18 // proposal threshold: 100k AXN
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
    {}

    // ── Proposal Creation with Metadata ──────────────────────
    function proposeWithMetadata(
        address[] memory targets,
        uint256[] memory values,
        bytes[]   memory calldatas,
        string    memory description,
        string    memory title,
        string    memory category,
        uint8            impactScore
    ) external returns (uint256 proposalId) {
        proposalId = propose(targets, values, calldatas, description);
        proposalMetadata[proposalId] = ProposalMetadata({
            title:       title,
            category:    category,
            impactScore: impactScore,
            isFlagged:   false,
            flagReason:  ""
        });
        // XP reward for proposal submission
        _awardXP(msg.sender, 500);
        return proposalId;
    }

    // ── Vote with XP Reward ───────────────────────────────────
    function castVoteAndEarnXP(
        uint256 proposalId,
        uint8   support    // 0=Against 1=For 2=Abstain
    ) external returns (uint256 balance) {
        balance = castVote(proposalId, support);
        _awardXP(msg.sender, 100);
        return balance;
    }

    // ── Security Sentinel: Flag Proposal ─────────────────────
    function flagThreat(uint256 proposalId, string memory reason) external {
        require(
            getVotes(msg.sender, block.number - 1) >= 50_000e18,
            "AxionGovernor: insufficient voting power to flag"
        );
        proposalMetadata[proposalId].isFlagged  = true;
        proposalMetadata[proposalId].flagReason = reason;
        emit ThreatFlagged(proposalId, reason, msg.sender);
    }

    // ── DAO Health Score (callable by oracle/admin) ───────────
    function updateHealthScore(uint256 score) external {
        require(score <= 100, "AxionGovernor: score out of range");
        daoHealthScore = score;
        emit DAOHealthUpdated(score, block.timestamp);
    }

    // ── XP & Contributor Classification ──────────────────────
    function _awardXP(address contributor, uint256 points) internal {
        contributorXP[contributor] += points;
        // Auto-classify contributor based on total XP
        uint256 xp = contributorXP[contributor];
        if      (xp >= 50_000) contributorClass[contributor] = "Architect";
        else if (xp >= 20_000) contributorClass[contributor] = "Sentinel";
        else if (xp >= 10_000) contributorClass[contributor] = "Diplomat";
        else if (xp >=  5_000) contributorClass[contributor] = "Merchant";
        else                   contributorClass[contributor] = "Explorer";
    }

    // ── Required Overrides ────────────────────────────────────
    function votingDelay() public view override(Governor, GovernorSettings)
        returns (uint256) { return super.votingDelay(); }

    function votingPeriod() public view override(Governor, GovernorSettings)
        returns (uint256) { return super.votingPeriod(); }

    function quorum(uint256 blockNumber)
        public view override(Governor, GovernorVotesQuorumFraction)
        returns (uint256) { return super.quorum(blockNumber); }

    function proposalThreshold() public view override(Governor, GovernorSettings)
        returns (uint256) { return super.proposalThreshold(); }

    function state(uint256 proposalId)
        public view override(Governor) returns (ProposalState) {
        return super.state(proposalId);
    }

    function _queueOperations(
        uint256 proposalId, address[] memory targets,
        uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash
    ) internal override returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(
        uint256 proposalId, address[] memory targets,
        uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash
    ) internal override {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets, uint256[] memory values,
        bytes[] memory calldatas, bytes32 descriptionHash
    ) internal override returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view override returns (address) {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(Governor) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
