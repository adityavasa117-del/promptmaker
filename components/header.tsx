import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/data";

export function Header() {
  return (
    <header className="w-full border-b border-transparent bg-background">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-mono text-base font-bold tracking-tight text-foreground"
        >
          cursor.directory
        </Link>

        {/* Navigation Links */}
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

        {/* Sign In Button */}
        <Button 
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
}
