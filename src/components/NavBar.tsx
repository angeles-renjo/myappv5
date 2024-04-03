"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

type Props = {
  user: Session["user"];
};

export default function App({ user }: Props) {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        {user && user.name ? (
          <NavbarItem>
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign out
            </button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <button
              onClick={() =>
                signIn("github", { callbackUrl: "/nice", redirect: true })
              }
            >
              Sign in
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
