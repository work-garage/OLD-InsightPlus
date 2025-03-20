import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button2 } from "../../components/ui/button2";
import FormattedDate from "../../components/ui/FormattedDate";

export default function TopNav() {
  return (
    <div className="bg-[#1A1D1F] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com" target="_blank" className="text-gray-400 hover:text-white">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" className="text-gray-400 hover:text-white">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>

          {/* <FormattedDate /> */}

          <div className="flex items-center gap-4 text-sm">
            <Link href="/signup">
              <Button2 variant="ghost" size="sm">
                Sign up
              </Button2>
            </Link>
            <Link href="/login">
              <Button2 variant="ghost" size="sm">
                Sign in
              </Button2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}