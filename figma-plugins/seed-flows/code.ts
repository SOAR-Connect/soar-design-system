/**
 * SOAR — Seed Canonical Flows (FigJam plugin)
 *
 * Run inside the SOAR-Journey FigJam file (8EqbJPZ2MsN8n18kI54LMU). Creates
 * 7 sticky-note flowcharts laid out vertically:
 *   1. Onboarding (22 steps)
 *   2. User Profile (12 steps)
 *   3. Connections (12 steps)
 *   4. Asks (5 steps)
 *   5. Inbox (9 steps)
 *   6. Notifications (4 steps)
 *   7. Dashboard (5 steps)
 *
 * Each flow is a section with: title sticky → step stickies in a row → arrows
 * between adjacent steps. Steps are pulled verbatim from
 * SOAR_handoff_unified.md "Canonical happy-path step lists".
 *
 * Safe to run multiple times: each run creates a new section dated with the
 * current timestamp. Existing sections are not modified.
 *
 * To install:
 *   1. Open the SOAR-Journey FigJam file.
 *   2. Menu → Plugins → Development → Import plugin from manifest…
 *   3. Pick this folder's manifest.json.
 *   4. Menu → Plugins → Development → "SOAR — Seed Canonical Flows".
 */

const FLOWS: { name: string; steps: string[] }[] = [
  {
    name: "Onboarding",
    steps: [
      "Welcome",
      "Log In",
      "Legal Disclaimer",
      "Personal Info — Name",
      "Mail",
      "Password",
      "Continue with Email Branch",
      "Address",
      "Phone",
      "Biography",
      "Interest",
      "Email Setup",
      "Calendar Setup",
      "Socials Setup",
      "Messaging Setup",
      "Address Book Setup",
      "Calls Setup",
      "Your First Ask",
      "Match Found",
      "Processing",
      "You're In",
      "Poll",
    ],
  },
  {
    name: "User Profile",
    steps: [
      "Profile Overview",
      "Personal Info — Email Reg",
      "Biography",
      "Email",
      "Calendar",
      "Socials",
      "Messaging",
      "Address Book",
      "Calls",
      "Notifications",
      "Interest",
      "Log Out",
    ],
  },
  {
    name: "Connections",
    steps: [
      "Connections — List",
      "Filters",
      "Search",
      "Hovers",
      "Combine Contacts",
      "Add New Connections",
      "User Profile — Emails",
      "Phones",
      "Socials",
      "Filters",
      "Blocked",
      "Menu",
    ],
  },
  {
    name: "Asks",
    steps: [
      "Asks — List",
      "Field + Result",
      "Ask Tooltip",
      "Edit Ask",
      "Pressing State",
    ],
  },
  {
    name: "Inbox",
    steps: [
      "Inbox — Overview",
      "Sent Asks",
      "Received Asks",
      "Introduce Connection",
      "Introduce Multiple Connections",
      "Complete Ask Modal",
      "Opt In",
      "Group Chat",
      "Notification",
    ],
  },
  {
    name: "Notifications",
    steps: [
      "Notifications — All",
      "Notifications — Inbox",
      "Add Interest From Notification",
      "Add to Black List",
    ],
  },
  {
    name: "Dashboard",
    steps: [
      "Dashboard — Overview",
      "Customer",
      "Regular",
      "Filter",
      "Filter by Location",
    ],
  },
];

// Layout constants (in FigJam canvas units = px)
const STICKY_W = 240;
const STICKY_H = 180;
const STICKY_GAP_X = 80;
const FLOW_GAP_Y = 320;
const TITLE_OFFSET_Y = -120;
const PER_ROW = 6; // wrap to a new row after this many

// Brand-ish colors (FigJam palette is limited; these are the closest tokens)
const COLOR_TITLE: StickyFillStyle = "LIGHT_GRAY";
const COLOR_STEP: StickyFillStyle = "YELLOW";

type StickyFillStyle =
  | "LIGHT_GRAY"
  | "GRAY"
  | "WHITE"
  | "YELLOW"
  | "ORANGE"
  | "RED"
  | "VIOLET"
  | "BLUE"
  | "TEAL"
  | "GREEN"
  | "LIGHT_PINK"
  | "PINK"
  | "BLACK";

(async () => {
  await figma.loadAllPagesAsync();

  // Always seed onto the current page so the user can pre-target a specific page.
  const page = figma.currentPage;

  // Anchor: place the new content below all existing nodes on the page.
  const existingBottom = page.children.reduce(
    (b, n) => Math.max(b, n.y + n.height),
    0,
  );
  const startY = existingBottom + 200;
  const startX = 0;

  const stamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  const sectionRoot = figma.createSection();
  sectionRoot.name = `SOAR Canonical Flows — ${stamp}`;
  sectionRoot.x = startX;
  sectionRoot.y = startY;

  let cursorY = 80;

  for (const flow of FLOWS) {
    // Title sticky (top-left of this flow)
    const title = figma.createSticky();
    title.text.characters = `${flow.name}\n(${flow.steps.length} steps)`;
    title.fills = [{ type: "SOLID", color: hexToRgb("#3a2018") }];
    (title as SectionNode | StickyNode).setPluginData(
      "flowKind",
      "title",
    );
    title.text.fills = [{ type: "SOLID", color: hexToRgb("#FFFFFF") }];
    title.authorVisible = false;
    title.x = 0;
    title.y = cursorY + TITLE_OFFSET_Y;
    sectionRoot.appendChild(title);

    // Step stickies in rows; arrows connect adjacent stickies.
    const stepNodes: StickyNode[] = [];
    flow.steps.forEach((label, i) => {
      const row = Math.floor(i / PER_ROW);
      const col = i % PER_ROW;
      const sticky = figma.createSticky();
      sticky.text.characters = `${i + 1}. ${label}`;
      sticky.fills = [{ type: "SOLID", color: hexToRgb("#F5D08A") }];
      sticky.text.fills = [{ type: "SOLID", color: hexToRgb("#1A0A00") }];
      sticky.authorVisible = false;
      sticky.x = col * (STICKY_W + STICKY_GAP_X);
      sticky.y = cursorY + row * (STICKY_H + 60);
      sectionRoot.appendChild(sticky);
      stepNodes.push(sticky);
    });

    // Connectors between adjacent steps.
    for (let i = 0; i < stepNodes.length - 1; i++) {
      const c = figma.createConnector();
      c.connectorStart = {
        endpointNodeId: stepNodes[i].id,
        magnet: "AUTO",
      };
      c.connectorEnd = {
        endpointNodeId: stepNodes[i + 1].id,
        magnet: "AUTO",
      };
      c.connectorLineType = "ELBOWED";
      c.connectorEndStrokeCap = "ARROW_LINES";
      c.strokes = [{ type: "SOLID", color: hexToRgb("#8b1f1a") }];
      sectionRoot.appendChild(c);
    }

    const rows = Math.ceil(flow.steps.length / PER_ROW);
    cursorY += rows * (STICKY_H + 60) + FLOW_GAP_Y;
  }

  // Resize section to fit content.
  sectionRoot.resizeWithoutConstraints(
    PER_ROW * (STICKY_W + STICKY_GAP_X) + 100,
    cursorY + 200,
  );

  figma.notify(`SOAR: seeded ${FLOWS.length} canonical flows.`);
  figma.closePlugin();
})();

function hexToRgb(hex: string): RGB {
  const h = hex.replace(/^#/, "");
  const n = parseInt(
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h,
    16,
  );
  return {
    r: ((n >> 16) & 0xff) / 255,
    g: ((n >> 8) & 0xff) / 255,
    b: (n & 0xff) / 255,
  };
}
