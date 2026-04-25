/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Locals {
  nonce: string;
}

declare namespace App {
  interface Locals extends Record<string, any> {
    nonce: string;
  }
}
