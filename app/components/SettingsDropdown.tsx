"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";

import { PiCheck } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { useOutsideClick } from "../hooks";
import {
  CopyIcon,
  LogoutIcon,
  PrivateKeyIcon,
  SettingsIcon,
  WalletIcon,
} from "./ImageAssets";
import { shortenAddress } from "../utils";
import { dropdownVariants } from "./AnimatedComponents";

export const SettingsDropdown = () => {
  const { user, logout, exportWallet } = usePrivy();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const { fundWallet } = useFundWallet();
  const handleFundWallet = async (address: string) => await fundWallet(address);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user?.wallet?.address ?? "");
    setIsAddressCopied(true);
    setTimeout(() => setIsAddressCopied(false), 2000);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label="Wallet details"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
      >
        <SettingsIcon />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={dropdownVariants}
          aria-label="Dropdown menu"
          className="absolute right-0 z-10 mt-4 w-fit space-y-4 overflow-hidden rounded-xl bg-gray-50 shadow-xl dark:bg-neutral-800"
        >
          <ul
            role="menu"
            aria-labelledby="settings-dropdown"
            aria-orientation="vertical"
            className="text-sm font-light text-black dark:text-white/80"
          >
            <li
              role="menuitem"
              className="flex cursor-pointer items-center justify-between gap-2 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-2.5"
                onClick={handleCopyAddress}
              >
                <div className="flex items-center gap-2.5">
                  <WalletIcon />
                  <p className="max-w-60 break-words">
                    {shortenAddress(user?.wallet?.address ?? "", 6)}
                  </p>
                </div>
                {isAddressCopied ? (
                  <PiCheck className="size-4" />
                ) : (
                  <CopyIcon className="size-4 transition group-hover:text-primary dark:hover:text-white" />
                )}
              </button>
            </li>
            <li
              role="menuitem"
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
              onClick={() => handleFundWallet(user?.wallet?.address ?? "")}
            >
              <RiMoneyDollarCircleLine className="text-lg text-gray-500 dark:text-white/40" />
              <p>Fund Account</p>
            </li>
            <li
              role="menuitem"
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
              onClick={exportWallet}
            >
              <PrivateKeyIcon />
              <p>Export Wallet</p>
            </li>
            <li
              role="menuitem"
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
              onClick={logout}
            >
              <LogoutIcon />
              <p>Sign out</p>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};
