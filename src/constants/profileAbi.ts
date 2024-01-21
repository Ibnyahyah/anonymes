export const PROFILE_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "AccountActivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "AccountDeactivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_newowner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "AccountTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "DeleteAccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "UpdateUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_message",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "UserCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "activateAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_array",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_element",
        type: "address",
      },
    ],
    name: "containsElement",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "fullname",
        type: "string",
      },
      {
        internalType: "string",
        name: "bio",
        type: "string",
      },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "deactivateAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "deleteAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getUserProfile",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "fullname",
            type: "string",
          },
          {
            internalType: "string",
            name: "bio",
            type: "string",
          },
          {
            internalType: "bool",
            name: "account_active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct UserProfile.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "isNotEmpty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oldOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferMyAccountOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "fullname",
        type: "string",
      },
      {
        internalType: "string",
        name: "bio",
        type: "string",
      },
    ],
    name: "updateUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
