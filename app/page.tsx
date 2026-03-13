import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Shield, Zap, Globe, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds. No friction, no fuss.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your links are protected behind your account. Only you can manage, edit, or delete them.",
  },
  {
    icon: Globe,
    title: "Share Anywhere",
    description:
      "Short links work everywhere — social media, emails, QR codes, or anywhere you need a tidy URL.",
  },
  {
    icon: MousePointerClick,
    title: "Easy Management",
    description:
      "View, organize, and delete all your links from one clean dashboard. Stay in control.",
  },
  {
    icon: Link2,
    title: "Custom Slugs",
    description:
      "Make your links memorable with custom short codes that reflect your brand or content.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <Badge variant="secondary" className="text-sm px-4 py-1">
          URL Shortener
        </Badge>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Shorten Links.{" "}
          <span className="text-muted-foreground">Share Anywhere.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
          Transform long, unwieldy URLs into clean, memorable short links.
          Manage everything from one dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              A full-featured link management platform built for simplicity and
              power.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight">
            Are you ready to get started?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join today and start shortening links and sharing smarter.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="px-8">
                Create Free Account
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>
    </div>
  );
}
