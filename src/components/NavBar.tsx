"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button color="danger" onClick={() => signOut()}>
          Sign Out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button color="primary" onClick={() => signIn()}>
        Sign In
      </Button>
    </>
  );
}

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">Journ</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard" color="foreground">
            DashBoard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
