import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { SidebarItem } from "@/components/ui/sidebar-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

afterEach(cleanup);

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

describe("Button", () => {
  it("renders as a <button> with default slot", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("data-slot", "button");
  });

  it("is disabled when disabled prop is set and ignores click", () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the variant class for 'destructive'", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("applies the variant class for 'outline'", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("applies the variant class for 'ghost'", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("applies size='sm' class", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
  });

  it("applies size='lg' class", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
  });

  it("applies size='icon' class", () => {
    render(<Button size="icon" aria-label="icon-btn" />);
    expect(screen.getByRole("button")).toHaveClass("size-9");
  });

  it("renders as child element when asChild=true", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    // When asChild, Slot renders the child <a> directly
    const link = screen.getByRole("link", { name: /home/i });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("data-slot", "button");
  });

  it("passes through additional className", () => {
    render(<Button className="my-custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });

  it("fires onClick handler when clicked", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Fire</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

describe("Badge", () => {
  it("renders with data-slot='badge'", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveAttribute("data-slot", "badge");
  });

  it("default variant has bg-primary class", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");
  });

  it("secondary variant has bg-secondary class", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
  });

  it("destructive variant has bg-destructive class", () => {
    render(<Badge variant="destructive">Danger</Badge>);
    expect(screen.getByText("Danger")).toHaveClass("bg-destructive");
  });

  it("success variant has bg-status-success class", () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass("bg-status-success");
  });

  it("warning variant has bg-status-warning class", () => {
    render(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toHaveClass("bg-status-warning");
  });

  it("error variant has bg-status-error class", () => {
    render(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("bg-status-error");
  });

  it("outline variant has border-border class", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border-border");
  });

  it("merges extra className", () => {
    render(<Badge className="extra-class">Extra</Badge>);
    expect(screen.getByText("Extra")).toHaveClass("extra-class");
  });
});

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

describe("Input", () => {
  it("renders an <input> with data-slot='input'", () => {
    render(<Input />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("defaults to text-like role when type is omitted (browser default)", () => {
    // HTML spec: omitting type behaves as type="text" but the attribute may
    // not be present in the serialized DOM — the role is sufficient.
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("respects explicit type prop", () => {
    const { container } = render(<Input type="email" />);
    expect(container.querySelector("input")).toHaveAttribute("type", "email");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("reflects placeholder text", () => {
    render(<Input placeholder="Search…" />);
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("fires onChange handler on user input", () => {
    const handler = vi.fn();
    render(<Input onChange={handler} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(handler).toHaveBeenCalledOnce();
  });

  it("forwards aria-invalid attribute", () => {
    render(<Input aria-invalid="true" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("merges className prop", () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
  });
});

// ---------------------------------------------------------------------------
// Card — slot composition
// ---------------------------------------------------------------------------

describe("Card", () => {
  it("renders all sub-components with correct data-slot attributes", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    const card = document.querySelector("[data-slot='card']");
    expect(card).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-header']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-title']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-description']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-action']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-content']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='card-footer']")).toBeInTheDocument();
  });

  it("renders children inside CardContent", () => {
    render(
      <Card>
        <CardContent>Hello Card</CardContent>
      </Card>
    );
    expect(screen.getByText("Hello Card")).toBeInTheDocument();
  });

  it("CardTitle receives custom className", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle className="my-title">My Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("My Title")).toHaveClass("my-title");
  });

  it("Card has rounded-xl and border classes by default", () => {
    const { container } = render(<Card />);
    const card = container.querySelector("[data-slot='card']");
    expect(card).toHaveClass("rounded-xl");
    expect(card).toHaveClass("border");
  });
});

// ---------------------------------------------------------------------------
// SidebarItem
// ---------------------------------------------------------------------------

describe("SidebarItem", () => {
  it("renders as a <button> with data-slot='sidebar-item'", () => {
    render(<SidebarItem>Home</SidebarItem>);
    const item = screen.getByRole("button", { name: /home/i });
    expect(item).toHaveAttribute("data-slot", "sidebar-item");
  });

  it("default state applies sidebar-foreground/80 opacity class", () => {
    render(<SidebarItem>Default</SidebarItem>);
    expect(screen.getByRole("button")).toHaveClass("text-sidebar-foreground/80");
  });

  it("active state applies bg-sidebar-accent class", () => {
    render(<SidebarItem state="active">Active</SidebarItem>);
    expect(screen.getByRole("button")).toHaveClass("bg-sidebar-accent");
  });

  it("is disabled when disabled prop is set", () => {
    render(<SidebarItem disabled>Disabled</SidebarItem>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as child element when asChild=true", () => {
    render(
      <SidebarItem asChild>
        <a href="/dashboard">Dashboard</a>
      </SidebarItem>
    );
    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("data-slot", "sidebar-item");
  });

  it("fires onClick handler", () => {
    const handler = vi.fn();
    render(<SidebarItem onClick={handler}>Click</SidebarItem>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// Tabs — keyboard-driven tab switching
// ---------------------------------------------------------------------------

describe("Tabs", () => {
  function renderTabs() {
    return render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );
  }

  it("renders with correct data-slot attributes", () => {
    renderTabs();
    expect(document.querySelector("[data-slot='tabs']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='tabs-list']")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-slot='tabs-trigger']").length).toBe(3);
    expect(document.querySelectorAll("[data-slot='tabs-content']").length).toBe(3);
  });

  it("shows first tab content by default", () => {
    renderTabs();
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("switches panel to active state when trigger is clicked (userEvent)", async () => {
    // Radix Tabs requires real pointer events to update state; fireEvent is not enough.
    const user = userEvent.setup();
    renderTabs();
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    await user.click(tab2);
    const panel2 = document.getElementById(tab2.getAttribute("aria-controls")!);
    expect(panel2).toHaveAttribute("data-state", "active");
  });

  it("Tab 3 trigger is disabled", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: /tab 3/i })).toBeDisabled();
  });

  it("first trigger has aria-selected='true' initially", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: /tab 1/i })).toHaveAttribute("aria-selected", "true");
  });

  it("trigger receives aria-selected after click (userEvent)", async () => {
    const user = userEvent.setup();
    renderTabs();
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    await user.click(tab2);
    expect(tab2).toHaveAttribute("aria-selected", "true");
  });
});

// ---------------------------------------------------------------------------
// Avatar — size variants + fallback
// ---------------------------------------------------------------------------

describe("Avatar", () => {
  it("renders AvatarFallback text when no image src is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("sm size applies size-6 class", () => {
    const { container } = render(
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
    );
    const root = container.querySelector("[data-slot='avatar']");
    expect(root).toHaveClass("size-6");
  });

  it("md size (default) applies size-8 class", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    );
    const root = container.querySelector("[data-slot='avatar']");
    expect(root).toHaveClass("size-8");
  });

  it("lg size applies size-10 class", () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    const root = container.querySelector("[data-slot='avatar']");
    expect(root).toHaveClass("size-10");
  });

  it("xl size applies size-14 class", () => {
    const { container } = render(
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    );
    const root = container.querySelector("[data-slot='avatar']");
    expect(root).toHaveClass("size-14");
  });

  it("renders AvatarFallback when AvatarImage src fails to load", () => {
    // Radix AvatarImage defers to AvatarFallback when the image has no src or
    // hasn't loaded; in a test environment with no HTTP, fallback always shows.
    render(
      <Avatar>
        <AvatarImage src="" alt="Test user" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );
    // Fallback text should be visible
    expect(screen.getByText("TU")).toBeInTheDocument();
  });

  it("AvatarFallback has data-slot='avatar-fallback'", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector("[data-slot='avatar-fallback']")).toBeInTheDocument();
  });

  it("passes custom className to Avatar root", () => {
    const { container } = render(
      <Avatar className="ring-2">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector("[data-slot='avatar']")).toHaveClass("ring-2");
  });
});
