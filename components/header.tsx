"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/queries";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 sm:h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-mono text-sm sm:text-base font-bold tracking-tight text-foreground"
        >
          writers.directory
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sign In Button */}
          <Button 
            className="hidden sm:inline-flex rounded-full bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign In
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-surface rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-surface rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border/50 mt-2">
              <Button 
                className="w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
