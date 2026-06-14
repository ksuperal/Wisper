# Zucgoo Design System

_Started 2026-06-13 15:00 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Untitled"
Project currently has 1 file(s)
Current date is now June 13, 2026
</system-info>

<pasted_text name="Pasted text (968 lines)">
# Deal App — Complete UI &amp; Component Specification
&gt; Full design prompt for developers and designers

---

## 1. DESIGN PHILOSOPHY

### The One Sentence
Every pixel serves the negotiation. Nothing else.

### The Feeling
Opening Deal during a negotiation should make your heart rate DROP — not rise. Like sliding into a cockpit. Everything you need. Nothing you don't. Calm. In control. Ready.

### Three Words
**Dark. Precise. Alive.**

- Dark — serious money tool. Not playful. Not corporate. Powerful.
- Precise — every element earns its place. No decoration.
- Alive — the live session screen breathes. It pulses. It feels active.

---

## 2. GLOBAL DESIGN TOKENS

### Colors

```
/* Brand */
--deal-ink:        #0A0A0A    /* primary background, darkest */
--deal-surface:    #141414    /* card backgrounds on dark */
--deal-raised:     #1C1C1C    /* elevated cards */
--deal-border:     #2A2A2A    /* all borders on dark bg */
--deal-muted:      #3A3A3A    /* disabled, secondary borders */

/* Signal — the ONE accent color */
--deal-signal:     #00E5A0    /* primary CTA, active state, wins */
--deal-signal-dim: #004D35    /* signal on dark, borders */
--deal-signal-bg:  #001F14    /* signal background tint */

/* Text hierarchy */
--deal-text-1:     #FFFFFF    /* primary text */
--deal-text-2:     #A0A0A0    /* secondary text */
--deal-text-3:     #555555    /* tertiary, labels */
--deal-text-4:     #333333    /* disabled */

/* Semantic */
--deal-danger:     #FF4D4D    /* walk away, alerts, LIVE dot */
--deal-danger-bg:  #2A0A0A    /* danger background tint */
--deal-warn:       #F5A623    /* watch out, caution */
--deal-warn-bg:    #2A1A00    /* warn background tint */

/* Move type colors */
--move-anchor:     #3B82F6    /* blue — set the range */
--move-mirror:     #8B5CF6    /* purple — reflect back */
--move-bridge:     #06B6D4    /* cyan — pivot variable */
--move-question:   #F5A623    /* amber — gather intel */
--move-silence:    #6B7280    /* gray — say nothing */
--move-walkaway:   #FF4D4D    /* red — leave */
--move-close:      #10B981    /* green — land it */
--move-takeit:     #00E5A0    /* signal — accept deal */
```

### Typography

```
Font family:    Inter (primary), system-ui fallback
Display:        32–40px, weight 500, tracking -0.03em
Heading 1:      24px, weight 500, tracking -0.02em
Heading 2:      18px, weight 500, tracking -0.015em
Heading 3:      15px, weight 500, tracking -0.01em
Body large:     15px, weight 400, line-height 1.6
Body:           13px, weight 400, line-height 1.6
Caption:        11px, weight 500, tracking 0.04em, UPPERCASE
Mono:           JetBrains Mono 12px (for numbers, codes)
```

### Spacing

```
4px   — micro gap (icon to label)
8px   — tight (within a component)
12px  — component internal padding
16px  — standard padding
20px  — section gap
24px  — large section gap
32px  — page section break
Screen padding: 20px left/right
Safe area: respect iOS/Android safe areas
```

### Border Radius

```
4px   — badges, pills small
8px   — inputs, small cards
12px  — standard cards
16px  — large cards, modals
24px  — bottom sheets
32px  — phone frame (external)
999px — full pill buttons
```

### Shadows (minimal — dark UI)

```
Card elevation:    none (borders only on dark)
Modal overlay:     background rgba(0,0,0,0.7)
Bottom sheet:      border-top 1px solid --deal-border
```

---

## 3. COMPONENT LIBRARY

### 3.1 Buttons

#### Primary Button (Signal)
```
Background:     #00E5A0
Text:           #001A12, 14px, weight 500
Height:         52px
Border radius:  12px
Padding:        0 24px
Width:          100% (full width on mobile)
Active state:   scale(0.98), background #00CC8F
Disabled:       background #1C1C1C, text #444
```

#### Secondary Button (Ghost)
```
Background:     transparent
Border:         1px solid #2A2A2A
Text:           #A0A0A0, 14px, weight 400
Height:         52px
Border radius:  12px
Active state:   background #1C1C1C
```

#### Danger Button (Walk Away)
```
Background:     transparent
Border:         1px solid #FF4D4D
Text:           #FF4D4D, 14px, weight 500
Height:         44px
Border radius:  10px
Active state:   background #2A0A0A
```

#### Icon Button
```
Size:           44x44px (minimum touch target)
Background:     #1C1C1C
Border:         1px solid #2A2A2A
Border radius:  10px
Icon size:      20px, color #A0A0A0
Active:         background #222, border #3A3A3A
```

#### Mic Button (special)
```
Size:           56x56px
Background:     #1C1C1C
Border:         1px solid #2A2A2A
Border radius:  999px (circle)
Icon:           microphone, 22px, #A0A0A0
Recording state: border 2px solid #FF4D4D, icon #FF4D4D
Pulse animation: ring expands outward at 1s interval when recording
```

---

### 3.2 Cards

#### Standard Card (dark)
```
Background:     #141414
Border:         1px solid #2A2A2A
Border radius:  12px
Padding:        16px
```

#### Raised Card (slightly lighter)
```
Background:     #1C1C1C
Border:         1px solid #2A2A2A
Border radius:  12px
Padding:        16px
```

#### Signal Card (move output — most important)
```
Background:     #001F14
Border:         1px solid #004D35
Border radius:  14px
Padding:        16px
Left accent:    4px solid #00E5A0 on left edge
```

#### Danger Card (walk away / warning)
```
Background:     #2A0A0A
Border:         1px solid #FF4D4D
Border radius:  12px
Padding:        14px
```

#### Stat Card (metric)
```
Background:     #141414
Border:         1px solid #2A2A2A
Border radius:  10px
Padding:        14px
Number:         24px, weight 500, #00E5A0
Label:          11px, #555, uppercase, tracking 0.04em
```

---

### 3.3 Move Badge

The move type identifier shown on every AI response.

```
Height:         26px
Padding:        0 10px
Border radius:  6px
Font:           11px, weight 500, uppercase, tracking 0.05em

ANCHOR    — background #1E3A5F, text #60A5FA, dot #3B82F6
MIRROR    — background #2E1A5E, text #A78BFA, dot #8B5CF6
BRIDGE    — background #0F3540, text #67E8F9, dot #06B6D4
QUESTION  — background #3A2800, text #FCD34D, dot #F5A623
SILENCE   — background #1F2020, text #9CA3AF, dot #6B7280
WALK AWAY — background #2A0A0A, text #FCA5A5, dot #FF4D4D
CLOSE     — background #052E16, text #6EE7B7, dot #10B981
TAKE IT   — background #001F14, text #00E5A0, dot #00E5A0
```

Each badge has a 6px colored dot to the left of the text label.

---

### 3.4 Input Fields

#### Text Input
```
Background:     #141414
Border:         1px solid #2A2A2A
Border radius:  10px
Height:         48px
Padding:        0 14px
Text:           #FFFFFF, 14px
Placeholder:    #444, 14px
Focus border:   1px solid #00E5A0
Font:           Inter 14px
```

#### Textarea (what they said)
```
Background:     #141414
Border:         1px solid #2A2A2A
Border radius:  12px
Padding:        14px
Min height:     80px
Text:           #FFFFFF, 14px, line-height 1.6
Placeholder:    #444
Focus border:   1px solid #00E5A0
Resize:         none (auto-expand with content)
```

#### Slider (style selector)
```
Track:          #2A2A2A, height 3px
Fill:           #00E5A0
Thumb:          18px circle, #00E5A0, no border
```

---

### 3.5 Pills / Tags

#### Category Pill (negotiation type)
```
Selected:       background #00E5A0, text #001A12, 13px weight 500
Unselected:     background #1C1C1C, text #555, border 1px #2A2A2A
Height:         34px
Padding:        0 14px
Border radius:  999px
```

#### Status Pill
```
Won:            background #001F14, text #00E5A0, border #004D35
Lost:           background #2A0A0A, text #FCA5A5, border #FF4D4D40
Ongoing:        background #1C1C1C, text #A0A0A0, border #2A2A2A
Height:         24px
Padding:        0 10px
Border radius:  999px
Font:           11px, weight 500
```

---

### 3.6 Navigation

#### Bottom Tab Bar
```
Background:     #0A0A0A
Border top:     1px solid #1C1C1C
Height:         64px + safe area
Items:          Home, Sessions, Stats, Profile
Icon:           24px, inactive #444, active #00E5A0
Label:          11px, inactive #444, active #00E5A0
Active indicator: 2px line above icon, #00E5A0
```

#### Top Bar (screens with back)
```
Background:     #0A0A0A
Height:         56px
Back button:    chevron-left 20px, #A0A0A0
Title:          15px, weight 500, #FFFFFF, centered
Right action:   optional icon button
Border bottom:  none (use spacing instead)
```

#### Live Session Top Bar (special)
```
Background:     #0A0A0A
Left:           Red pulsing dot + "LIVE" in #FF4D4D, 11px weight 500
Center:         Session name, 13px #555
Right:          Move counter "3 / ?" in #444, 11px
Height:         52px
Border bottom:  1px solid #1C1C1C
```

---

### 3.7 Progress &amp; Indicators

#### Step Progress (setup form)
```
Track:          2px line, #2A2A2A
Fill:           2px line, #00E5A0
Step dot:       8px circle
Active:         #00E5A0
Complete:       #004D35 with check
Incomplete:     #2A2A2A
```

#### Score Bar (debrief)
```
Track:          #1C1C1C, height 6px, radius 999px
Fill:           #00E5A0, animated on mount
Score text:     32px, weight 500, #FFFFFF
Score label:    13px, #555
```

#### Live Thinking Indicator
```
Three dots in a row
Dot size:       8px, border-radius 50%
Color:          #00E5A0
Animation:      sequential fade 0→1→0.3, 0.4s each, staggered 0.15s
Label:          "Analyzing..." 11px #555
```

#### LIVE Dot (session active)
```
Size:           7px circle
Color:          #FF4D4D
Animation:      pulse — scale 1→1.4→1, opacity 1→0→1, 1.2s infinite
```

---

### 3.8 List Items

#### Session List Item
```
Background:     #141414
Border bottom:  1px solid #1C1C1C (last item: none)
Padding:        14px 20px
Height:         ~68px

Left:           
  Category icon badge — 36x36px, #1C1C1C bg, signal icon
  
Center (flex-col):
  Title: 14px, weight 500, #FFFFFF — "Salary @ TechCorp"
  Subtitle: 12px, #555 — "June 13 · 4 moves"

Right:
  Status pill (Won/Lost/Ongoing)
  Amount: 13px, weight 500, #00E5A0 — "+$11K"
```

#### Move History Item (inside session)
```
Left:           Move badge (compact, 24px height)
Center:         AI line preview, 12px #A0A0A0, 1 line truncated
Right:          Move number #3, 11px #444
Padding:        10px 0
Border bottom:  1px solid #1C1C1C
```

---

### 3.9 Bottom Sheet

Used for: negotiation type picker, settings panels

```
Overlay:        rgba(0,0,0,0.7) full screen
Sheet:          background #141414
Border top:     1px solid #2A2A2A
Border radius:  24px 24px 0 0
Padding:        24px 20px
Handle:         32x4px, #2A2A2A, radius 999px, centered top
Animation:      slide up 300ms ease-out
Dismiss:        swipe down or tap overlay
```

---

### 3.10 Toast / Feedback

```
Background:     #1C1C1C
Border:         1px solid #2A2A2A
Border radius:  10px
Padding:        12px 16px
Position:       top center, 16px from top, safe area aware
Animation:      fade+slide down 200ms, auto dismiss 2.5s
Max width:      300px

Success variant: border-left 3px solid #00E5A0
Error variant:   border-left 3px solid #FF4D4D
```

---

## 4. SCREEN SPECIFICATIONS

### Screen 1 — Splash / Onboarding

```
Background: #0A0A0A full screen

Logo centered:
  Diamond mark SVG — 48x48px, #00E5A0
  "Deal" wordmark — 32px, weight 500, #FFFFFF, tracking -0.03em
  Tagline — "Stop leaving money on the table." 14px #555

[3 onboarding slides — swipe right]

Slide 1: "Your negotiation co-pilot"
  Illustration: phone with move card showing
  Body: 15px #A0A0A0, centered, max 2 lines

Slide 2: "Tell Deal what happened"
  Illustration: input field with text
  Body: 15px #A0A0A0

Slide 3: "Get your exact next move"
  Illustration: move card (ANCHOR, signal green)
  Body: 15px #A0A0A0

Dots: 6px, active #00E5A0, inactive #2A2A2A
CTA: Primary button "Get started" — bottom 40px + safe area
Skip: "Sign in" text link, 13px #555, above CTA
```

---

### Screen 2 — Dashboard (Home)

```
Background: #0A0A0A

TOP BAR (no border):
  Left:   "Good morning" 11px #555 / "Deal" logo 18px #FFFFFF
  Right:  Avatar circle 34px — initials on #1C1C1C

HERO CTA CARD:
  Background: #00E5A0
  Border radius: 16px
  Padding: 20px
  Label: "START NEGOTIATION" 10px #004D35 weight 500 uppercase
  Title: "What are you negotiating?" 18px #001A12 weight 500
  Arrow: → right edge, 20px #004D35
  Margin bottom: 16px

STATS ROW (2 columns):
  Card 1: Sessions count — 24px #00E5A0 / "Sessions" 11px #555
  Card 2: Total won — "$23K" 24px #00E5A0 / "Total won" 11px #555
  Gap: 8px

SECTION LABEL:
  "Recent sessions" 11px #444 uppercase tracking 0.04em
  Margin: 20px top, 10px bottom

SESSION LIST:
  [Session list items — see 3.8]
  Empty state: centered icon + "No sessions yet" + CTA

BOTTOM TAB BAR
```

---

### Screen 3 — Setup Form (Step 1 of 2)

```
Background: #0A0A0A
Top bar: back button + "New negotiation" title

STEP INDICATOR:
  Two dots — step 1 active (#00E5A0), step 2 inactive (#2A2A2A)
  "Step 1 of 2" 11px #555 below dots

SECTION: "The situation"
  18px weight 500 #FFFFFF, margin bottom 20px

TYPE PICKER (horizontal scroll row of pills):
  [Salary] [Rent] [Contract] [Medical] [Vendor] [Other]
  Pills — see 3.5 Category Pill spec
  Default: none selected. Required.

FIELD: "My goal"
  Label: 11px #555 uppercase "WHAT DO YOU WANT TO ACHIEVE?"
  Input: textarea — placeholder "Get a salary of $95,000..."
  Margin bottom: 16px

FIELD: "Their current offer"
  Label: "WHAT ARE THEY OFFERING?"
  Input: text — placeholder "$82,000"
  Keyboard: numeric with decimal

FIELD: "My walk-away point"
  Label: "I WON'T ACCEPT LESS THAN..."
  Input: text — placeholder "$88,000"
  Helper: 11px #555 "This stays private. AI uses this to know when to say stop."

CTA: Primary button "Next →" — fixed bottom, 20px margin, safe area
```

---

### Screen 4 — Setup Form (Step 2 of 2)

```
Background: #0A0A0A
Top bar: back + "New negotiation"

STEP INDICATOR: step 2 active

SECTION: "Your leverage"
  18px weight 500 #FFFFFF

FIELD: "My leverage"
  Label: "WHY DO YOU HAVE POWER?"
  Textarea — placeholder "I have a competing offer from Company B for $91K. They've been hiring for this role for 3 months..."
  Helper: "The more detail, the better the strategy."
  Min height: 100px

FIELD: "Their pressure" (optional)
  Label: "WHAT PRESSURE MIGHT THEY BE UNDER? (OPTIONAL)"
  Textarea — placeholder "End of quarter, hiring freeze coming..."

STYLE SELECTOR:
  Label: "HOW AGGRESSIVE?"
  Three pill options in a row:
    [Collaborative] [Balanced] [Hardball]
  Default: Balanced selected
  Helper text below each (small, 11px #555):
    Collaborative: "Preserve the relationship"
    Balanced: "Firm but professional"
    Hardball: "Maximum outcome"

CTA: Primary button "Generate my strategy →"
  Loading state: "Building your playbook..." with spinner
```

---

### Screen 5 — Strategy Brief

```
Background: #0A0A0A
Top bar: "× Close" left, "Your playbook" center

HEADER:
  Green dot + "READY" pill — #00E5A0 bg, #001A12 text
  Negotiation title: "Salary · TechCorp" 15px #FFFFFF weight 500
  Date/time: "June 13, 2026" 12px #555

YOUR RANGE CARD:
  Background: #141414, border #2A2A2A
  Three columns divided by 1px #2A2A2A lines:
    Left:   "Target" 10px #555 / "$95–100K" 18px #00E5A0 weight 500
    Center: "Floor" 10px #555 / "$88K" 18px #FFFFFF weight 500
    Right:  "Gap" 10px #555 / "$13K" 18px #FFFFFF weight 500
  Padding: 16px

OPENING MOVE CARD (Signal Card):
  Background: #001F14, border: 1px solid #004D35
  Move badge: [ANCHOR]
  "Your opening line:" 11px #00E5A0 uppercase
  Quote: "Based on my research and the market data for this role, I was expecting to be in the $103–108K range." 
  14px #E0E0E0, line-height 1.6, italic

WATCH OUT SECTION:
  Label: "THEIR LIKELY MOVES" 11px #555 uppercase
  List of 2-3 tactics with ! icon in #F5A623:
    "That's our budget ceiling"
    "We need a decision by Friday"
    "You're our top candidate" (creates urgency)

YOUR POWER MOVES:
  Label: "YOUR LEVERAGE" 11px #555 uppercase
  List with ✓ in #00E5A0:
    "Competing offer: $91K from Company B"
    "3 months open role — they're desperate"
    "Bridge to signing bonus if salary stalls"

CTA: Primary button "I'm ready — start session"
  Full width, signal green
  Subtlety: "Your strategy is saved. Return anytime."
  11px #444 below button
```

---

### Screen 6 — Live Session (THE CORE SCREEN)

```
Background: #0A0A0A
This screen must load instantly. Every millisecond matters.

LIVE TOP BAR:
  Left:   [● LIVE] — 7px red pulsing dot + "LIVE" 11px #FF4D4D weight 500
  Center: "Salary · TechCorp" 12px #555
  Right:  "Move 3" 11px #444
  Height: 52px
  Border bottom: 1px solid #1C1C1C

CONTEXT BAR (below top bar):
  Single line: "Goal $95K · Floor $88K · Offer $82K"
  11px #444, padding 8px 20px
  Background: #0A0A0A
  Border bottom: 1px solid #141414

---- SCROLLABLE CONTENT AREA ----

MOVE CARD (signal card — dominates screen):
  Background: #001F14
  Border: 1px solid #004D35
  Border left: 4px solid #00E5A0
  Border radius: 14px
  Padding: 16px
  Margin: 16px 20px

  TOP ROW:
    Move badge [BRIDGE] left
    Move number "Move 3" right — 11px #444

  SAY THIS:
    "SAY THIS:" 10px #00E5A0 uppercase, weight 500, margin 10px 0 6px
    Quote text: "I appreciate you going to bat for me. If base salary has a ceiling, can we look at a signing bonus or an earlier review at 6 months?"
    15px #FFFFFF, line-height 1.65
    Background: #0A1F14 inner block, radius 8px, padding 12px

  WHY:
    Divider: 1px #004D35
    "WHY" 10px #555 uppercase, margin 10px 0 4px
    "Gives them a face-saving yes on a different budget line." 13px #888

  WATCH FOR:
    "WATCH FOR" 10px #555 uppercase, margin 8px 0 4px
    "If they say 'let me check' — they're not at ceiling." 13px #888

MOVE HISTORY (collapsible, below move card):
  "Previous moves" 11px #444 uppercase — tap to expand
  Shows last 3 moves as compact items
  Default: collapsed

---- FIXED BOTTOM INPUT AREA ----
Background: #0A0A0A
Border top: 1px solid #1C1C1C
Padding: 12px 20px + safe area

INPUT LABEL:
  "WHAT DID THEY JUST SAY?" 10px #555 uppercase, margin bottom 8px

TEXTAREA:
  [see spec 3.4 Textarea]
  Placeholder: "Type or tap mic to whisper..."
  Auto-expands up to 3 lines then scrolls

ACTION ROW (below textarea, margin top 10px):
  Left:  Mic button — 52x52px circle (see 3.1)
  Right: Primary button "Get my move →" — height 52px, flex-1

DANGER ROW (below action row):
  Two text buttons side by side:
    Left:  "Deal closed" — 13px #00E5A0
    Right: "Walk away" — 13px #FF4D4D
  Both tappable, triggers session end flow
```

---

### Screen 7 — Live Session (AI Thinking State)

```
Everything same as Screen 6 EXCEPT:

MOVE CARD replaced by THINKING CARD:
  Background: #141414
  Border: 1px solid #2A2A2A
  Border radius: 14px
  Padding: 40px 20px
  Content centered:
    Three dot animation (see 3.7)
    "Analyzing their position..." 12px #555, margin top 12px

INPUT AREA:
  Textarea: disabled, text #333
  Mic button: disabled
  "Get my move →" button: 
    Background: #1C1C1C
    Text: "Thinking..." #444
    Disabled — no tap
```

---

### Screen 8 — Session End

```
Background: #0A0A0A
Modal style — slides up from bottom

TITLE: "How did it go?" 22px weight 500 #FFFFFF
Subtitle: "Tell us the outcome so we can debrief you." 14px #555

OUTCOME PICKER (2x2 grid of cards):
  [Won the deal] — border on select: #00E5A0
  [Still ongoing] — border on select: #F5A623
  [I walked away] — border on select: #A0A0A0
  [They walked away] — border on select: #FF4D4D
  Each: 70px height, centered icon + label, radius 12px

FIELD: "Final outcome"
  Label: "WHAT WAS AGREED?"
  Textarea — placeholder "$93,000 salary + $5K signing bonus"

FIELD: "How did you feel?"
  Row of 5 emoji-style pills (icons only):
    Confident / Nervous / In control / Pressured / Neutral

CTA: "Get my debrief →" primary button
```

---

### Screen 9 — Debrief

```
Background: #0A0A0A
Top bar: "Session debrief" + share icon button (top right)

RESULT HEADER CARD:
  Background: #001F14, border #004D35, radius 14px, padding 16px
  Context: "Salary · TechCorp · June 13" 11px #555
  Result line: "$82K → $93K + $5K signing" 13px #A0A0A0
  Big number: "+$11,000" 36px weight 500 #00E5A0 tracking -0.03em
  Verdict badge: [Above target] or [Below target] pill

SCORE CARD:
  Label: "NEGOTIATION SCORE" 11px #555 uppercase
  Number: "7.8" 40px weight 500 #FFFFFF
  Subtext: "/ 10" 20px #555
  Progress bar (see 3.7 Score Bar)
  Animated on screen mount: 0 → 7.8 over 800ms ease-out

WHAT WORKED:
  Section header: "WHAT WORKED" 11px #555 uppercase + green dot
  List of 3 items:
    ✓ icon #00E5A0 + text 13px #A0A0A0, line-height 1.6
    Bottom border between items #1C1C1C

IMPROVE NEXT TIME:
  Section header: "DO BETTER NEXT TIME" 11px #F5A623 uppercase + amber dot
  List of 3 items:
    → icon #F5A623 + text 13px #A0A0A0
    
THEIR TACTICS:
  Section header: "THEY USED ON YOU" 11px #555 uppercase
  Horizontal scroll row of tactic pills:
    e.g. [False ceiling] [Social proof] [Time pressure]
    Pills: #1C1C1C bg, #A0A0A0 text, border #2A2A2A

SHARE BUTTON:
  Full width, but DANGER red button style:
  "Share my win" — background #FF4D4D, text #FFFFFF
  Only shows if outcome = Won
```

---

### Screen 10 — Win Card (Share Sheet)

```
Full screen overlay: #001A12 background

TOP: Deal logo centered (diamond + "Deal" wordmark)
     #00E5A0 color

DIVIDER: thin line #004D35

CENTER:
  "I just negotiated" 13px #555
  Amount: "+$11,000" 52px weight 500 #00E5A0 tracking -0.04em
  Context: "more in salary" 14px #888
  
DIVIDER: thin line #004D35

BOTTOM DETAILS:
  "$82,000 → $93,000" 13px #555
  "TechCorp · June 2026" 12px #444

FOOTER:
  "getdeal.app" 12px #004D35

Share buttons row (below card):
  [Copy image] [Instagram] [Twitter/X] [WhatsApp]
  Each 44px icon button
```

---

## 5. MOTION &amp; ANIMATION

### Principles
- Fast in, slow out (ease-out default)
- Functional only — no animation for decoration
- Respect prefers-reduced-motion

### Specific Animations

```
Screen transition:    slide left/right 280ms ease-out
Bottom sheet open:    slide up 300ms cubic-bezier(0.32,0.72,0,1)
Bottom sheet close:   slide down 250ms ease-in
Move card appear:     fade + slide up 8px, 250ms ease-out
Score bar fill:       left to right, 800ms ease-out, delay 200ms
LIVE dot pulse:       scale 1→1.5→1 + opacity 1→0→1, 1.2s infinite
Thinking dots:        sequential opacity, 0.4s each, stagger 0.15s
Number count-up:      0 → final value, 600ms ease-out (wins/stats)
Tab switch:           instant icon change + 150ms label fade
Toast:                fade+translate-y 200ms, dismiss 2.5s hold + 200ms fade
Button tap:           scale 0.97, 80ms, spring back 150ms
```

---

## 6. EMPTY STATES

### No sessions yet (Dashboard)
```
Icon:    handshake outline, 48px, #2A2A2A
Title:   "No deals yet" 16px #FFFFFF weight 500
Body:    "Start your first negotiation and see how much more you can win." 14px #555
CTA:     "Start negotiating" primary button (smaller, not full-width)
```

### Session history empty
```
Icon:    clock outline, 40px, #2A2A2A
Title:   "Nothing here yet"
Body:    "Your session history will show up here."
No CTA
```

---

## 7. ERROR STATES

### AI response failed
```
Move card background: #141414 (neutral, not signal)
Icon: refresh outline, 24px, #555
Message: "Couldn't get your move. Check your connection." 13px #888
CTA: "Try again" — small ghost button, inline
```

### No internet during live session
```
Banner: slides down from top bar
Background: #2A1A00, border-bottom 1px #F5A623
Icon: wifi-off 16px #F5A623
Text: "No connection — input still works, move will send when back online" 12px #F5A623
```

---

## 8. ACCESSIBILITY

```
Minimum touch target: 44x44px (all interactive elements)
Color contrast:       #FFFFFF on #0A0A0A = 19.5:1 (AAA)
                      #00E5A0 on #001F14 = 8.2:1 (AAA)
                      #A0A0A0 on #0A0A0A = 5.9:1 (AA)
Font minimum:         13px body, 11px labels only
Focus rings:          2px outline #00E5A0, 2px offset
Screen reader:        all icons have aria-label
Haptics:              light impact on button press
                      success haptic on move received
                      heavy impact on walk away tap
Reduce motion:        all animations respect prefers-reduced-motion
                      replace with instant/opacity-only fallbacks
```

---

## 9. DEVELOPER HANDOFF NOTES

### React Native Component Names
```
&lt;DealButton variant="primary|secondary|danger|icon|mic" /&gt;
&lt;DealCard variant="standard|raised|signal|danger|stat" /&gt;
&lt;MoveBadge type="anchor|mirror|bridge|question|silence|walkaway|close|takeit" /&gt;
&lt;MoveCard move={} isLoading={} /&gt;
&lt;SessionItem session={} /&gt;
&lt;ThinkingIndicator /&gt;
&lt;LiveDot /&gt;
&lt;WinCard session={} /&gt;
&lt;StatusPill status="won|lost|ongoing" /&gt;
&lt;CategoryPill label="" selected={} onPress={} /&gt;
&lt;SetupProgress step={1|2} /&gt;
&lt;ScoreBar score={7.8} animated={} /&gt;
```

### Key Measurements
```
Bottom tab bar:       64px + device safe area
Top bar:              56px
Live top bar:         52px + context bar 36px = 88px total
Input area (live):    ~130px + safe area
Card border radius:   12px standard, 14px move card
Screen side padding:  20px
Card gap:             8px
Section gap:          20px
```

### Font Loading
```
Inter: weights 400, 500 only
Load via: @fontsource/inter or Google Fonts
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui
```

---

*Deal UI Specification v1.0*
*Mobile-first. Dark. Precise. Alive.*
</pasted_text>

<pasted_text name="Pasted text (63 lines)">
# Deal — What It Is &amp; How It Looks

---

## What Is Deal?

Deal is your personal negotiation coach that lives in your pocket. You open it right before or during any high-stakes conversation — a salary negotiation, rent renewal, freelance contract, car dealership, medical bill dispute — and it tells you exactly what to say next in real time.

You type or whisper what the other person just said. Deal tells you your next move in under 2 seconds. One tactical action. One exact line to say. One reason why. Nothing more.

It is not a chatbot. It is not a research tool. It is a co-pilot — like having a Harvard-trained negotiation expert sitting next to you whispering in your ear during every important conversation you will ever have.

The difference between Deal and anything else out there is that it is built specifically for negotiation. Not meetings. Not interviews. Not general AI assistance. Just the moment when money and power are on the table and you need to know what to do right now.

---

## How It Works in Real Life

You are on a call with your hiring manager. They just said "look, $88,000 really is our absolute ceiling." Your heart rate spikes. You glance at your phone. Deal says: Bridge. Then it gives you the exact words — "I appreciate that. If base salary has a ceiling, can we look at a signing bonus or an earlier performance review instead?" You say it. They pause. They come back with $5,000 signing bonus. You won.

That is the whole product. Fast. Tactical. Always on your side.

---

## How It Looks

Deal is a dark app. Nearly black background everywhere — not because it is trying to look cool, but because when you are in a tense negotiation and you glance at your phone, a bright white screen is jarring and conspicuous. Dark feels like a cockpit. Calm. In control. Nothing screaming at you.

The only color that ever pops is a vivid mint green — what the brand calls Signal green. It only appears on the most important thing on screen at any given moment. Your next move. Your win number. The button you need to tap. Everything else is grey or white. Your eye always knows exactly where to look without thinking.

The typography is clean and sparse. Big numbers. Short sentences. Nothing longer than two lines on the live screen. When you are mid-negotiation you have two seconds to read and react. The design respects that completely.

---

## Screen by Screen

**When you first open it** you see the Deal logo — a clean diamond mark in mint green on black — and a single tagline: "Stop leaving money on the table." Three quick onboarding slides show you how it works, then you are in.

**The home screen** feels like a quiet command center. A big mint green card at the top says "Start negotiation — what are you negotiating?" Below that are two stat cards showing your total sessions and total money won. Below that is your recent session history — each one showing what you negotiated, how many moves it took, and how much you gained.

**The setup form** is two short steps. First you pick the negotiation type — salary, rent, contract, medical bill, vendor, other — and fill in three numbers: your goal, their offer, your walk-away point. Second step you describe your leverage and choose how aggressive you want the AI to be — collaborative, balanced, or hardball. That is it. Takes about 90 seconds.

**The strategy brief** appears before the negotiation starts. It shows your target range, your recommended opening move with the exact words, a list of tactics they are likely to use against you, and your key leverage points. It is your pre-battle cheat sheet. You read it, tap "I'm ready," and go in.

**The live session screen** is the heart of the app and the most important thing Deal does. The screen is divided simply — the top two thirds show the AI's current move recommendation in a glowing green-bordered card. The bottom third is your input area where you type or tap the mic to whisper what the other person just said.

The move card shows four things and nothing else. The move type — a colored badge like ANCHOR or MIRROR or BRIDGE or SILENCE. The exact line to say in quotation marks. One sentence explaining the tactical reason. One thing to watch for in their response. That is the entire output. No essays. No explanations. Just what to do right now.

In the top left corner a small red dot pulses with the word LIVE next to it. This tells you the session is active. It has a heartbeat. The whole screen feels alive without being distracting.

When you are waiting for the AI to respond — which takes under two seconds — the move card is replaced by three softly pulsing green dots and the word "Analyzing." Then the move appears with a smooth fade-in.

**The debrief screen** appears after you close the session. It shows your result in large numbers — how much you started with, what you got, how much you gained. Below that a score out of ten animates from zero up to your result. Then three things that worked, three things to do better next time, and a breakdown of every tactic the other side used against you. At the bottom a red button says "Share my win."

**The win card** is designed to be shared. Dark green background. Your gain in huge numbers — "+$11,000" — with the context below. The Deal logo at the top. Your domain at the bottom. It looks like a receipt from a battle you won. People post these.

---

## The One Thing That Makes It Feel Different

Every other app in this space tries to help you fake your way through something. Deal is not about faking. It is about knowing. The people who use it are not cheating — they are learning in real time. Every session ends with a debrief that makes them better for the next one. The app is not a crutch. It is a teacher that shows up exactly when you need it.

That is what Deal is. A quiet, dark, precise tool that makes you better at the most important financial conversations of your life.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design.

Follow this general design process (use the todo list to remember):
(1) ask questions, (2) find existing UI kits and collect design context — copy ALL relevant components and read ALL relevant examples; ask the user if you can't find them, (3) start your file with assumptions + context + design reasoning (as if you are a junior designer and the user is your manager), with placeholders for the designs, and show it to the user early, (4) build out the designs and show the user again ASAP; append some next steps, (5) use your tools to check, verify and iterate on the design.

Good hi-fi designs do not start from scratch — they are rooted in existing design context. Ask the user to Import their codebase, or find a suitable UI kit / design resources, or ask for screenshots of existing UI. You MUST spend time trying to acquire design context, including components. If you cannot find them, ask the user for them. In the Import menu, they can link a local codebase, provide screenshots or Figma links; they can also link another project. Mocking a full product from scratch is a LAST RESORT and will lead to poor design. If stuck, try listing design assets and ls'ing design system files — be proactive! Some designs may need multiple design systems — get them all. Use the starter components (device frames and the like) to get high-quality scaffolding for free.

When presenting several options or explorations side-by-side, lay them out clearly: give the page a neutral gray background, put each option in its own labeled frame (a small heading + a white rounded card sized to its content), and group related options into sections.

When designing, asking many good questions is ESSENTIAL.

Give options: try to give 3+ variations across several dimensions. Mix by-the-book designs that match existing patterns with new and novel interactions, including interesting layouts, metaphors, and visual styles. Have some options that use color or advanced CSS; some with iconography and some without. Start your variations basic and get more advanced and creative as you go! Try remixing the brand assets and visual DNA in interesting ways — play with scale, fills, texture, visual rhythm, layering, novel layouts, type treatments. The goal is not the perfect option; it's exploring atomic variations the user can mix and match.

CSS, HTML, JS and SVG are amazing. Users often don't know what they can do. Surprise the user.

If you do not have an icon, asset or component, draw a placeholder: in hi-fi design, a placeholder is better than a bad attempt at the real thing.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>

<attached-skill name="Zucgoo Design System (design system)">
[Design System] This project uses the **Zucgoo Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

This project has the **ZucgooDesignSystem_7b8428** design system bound under `_ds/`. Run `list_files` on `_ds/` to find the bound folder (one folder per design system), e.g. `_ds/<folder>/`.

**Loading the bundle is how you use this design system.** Every page you build must load `_ds/<folder>/_ds_bundle.js` and compose with the components it exports on `window.ZucgooDesignSystem_7b8428` — do not recreate those components from scratch or restyle raw HTML to look like them. The bundle calls `React.createElement`, so `window.React` and `window.ReactDOM` must be loaded first. Then add these once:

```html
<link rel="stylesheet" href="_ds/<folder>/colors_and_type.css">
<link rel="stylesheet" href="_ds/<folder>/ui_kits/marketing-site/site.css">
<script src="_ds/<folder>/_ds_bundle.js"></script>
```

The bundle is plain compiled JS — load it with a regular `<script>` (no `type="text/babel"` or `type="module"`). Every component is then available on `window.ZucgooDesignSystem_7b8428` — e.g. `const { Button, Card } = window.ZucgooDesignSystem_7b8428;`. The linked stylesheet(s) carry the design tokens (colors, type, spacing) — style against those via `var(--*)` and the design system's classes rather than guessing values.

The full design-system source tree lives at `/projects/7b8428df-9aa2-4180-9233-5faaa590918f/` — use `list_files` / `read_file` from there for anything not under `_ds/` (layout varies by brand; don't assume folder names). Its guide is reproduced below so you don't need to fetch it:

<design-system-guide>
# Zucgoo Design System

&gt; **find your sweet.**
&gt;
&gt; Homemade panna cotta. Three flavors. One hummingbird. **89฿.** Bangkok.

A reusable kit of brand foundations, components, and templates for **zucgoo** — a Bangkok homemade panna cotta shop. Use it for the website, packaging, social posts, in-shop signage, Line stickers, anything that should *feel like zucgoo*.

---

## The brand in one paragraph

zucgoo is built around **Goo**, a hummingbird in a rounded hat. Hummingbirds eat every 10–15 minutes or they die — sweetness isn't a treat, it's survival fuel. Over 22 million years, flowers turned red and reshaped themselves for the bird that loved them most. That's the relationship zucgoo wants with the customer: **made specifically for the people who find sweetness everywhere, any time, without apology.** No special occasion needed. No guilt required.

Three panna cotta balls, made every morning in Bangkok. Real fruit. Homemade sauce. No preservatives. **89 baht.** Order via **Line @zucgoo**.

---

## The Products

| Flavour | Mood | Colour |
|---|---|---|
| **Strawberry Matcha** | The one that balances you out. Earthy meets bright. For when you want both and won't apologize for it. | Olive `#3B6D11` |
| **Peach Butterscotch** | Soft, warm, golden. For when it was actually a good day and you want to stay in it a little longer. | Amber `#C8963E` |
| **Raspberry Dark Chocolate** | Bold. A little intense. You had a day. You know you did. | Raspberry `#4A0A1E` |

---

## Sources &amp; provenance

| Source | What it was |
|---|---|
| Brand brief (pasted, May 2026) | Voice, products, tagline, palette, ordering channel. Source of truth for everything below. |
| `uploads/Asset 1–12.png` | 12 mascot poses of **Goo** (thumbs-up, flying, peeking, resting, holding a jar, etc.) |
| `uploads/Asset 13–26.png` | Decorative stickers — stars, hearts, sparkles, the hat alone, droplets, scalloped starbursts — each available in cream and crimson. |
| `uploads/Asset 27.png` | **Primary lockup**: Goo peeking over the chunky "zucgoo" wordmark. |
| `uploads/Asset 28.png` | **Badge mark**: oval seal. |
| `uploads/Asset 29.png` | **Repeating pattern** tile (wordmarks + droplets). |
| `uploads/DelaGothicOne-Regular.ttf` | Display typeface, installed in `fonts/`. |
| `uploads/BrandGuideline_ZUCGOO (1).pdf` · `Logo_ZUCGOO.ai` · `drive-download-…-3-001.zip` | _Were referenced in the upload list but **did not arrive** in the project filesystem._ Re-upload if you want the design system to absorb anything in them. |

---

## CONTENT FUNDAMENTALS

### Voice
**Direct. Warm. A little dramatic in the best way.** Short sentences. Full stops for emphasis. Never begs. Never justifies. **Assumes the customer already deserves something good today — because they do.**

- **Casing:** **lowercase for the brand name and headlines.** Sentence case for body. (The wordmark is lowercase; we commit.)
- **Sentence length:** short. 5–10 words. One thought per line. Sometimes one word.
- **Punctuation:** full stops do real work. Em-dashes for breath. Exclamation points only when Goo would actually shout.
- **Person:** "you" to the customer, "we" for the brand. Never "the user", never "consumers".

### Use
- ✅ `Made this morning.`
- ✅ `Right here. Right now.`
- ✅ `Find your sweet.`
- ✅ `89 baht. Real fruit. No reason needed.`
- ✅ `Three panna cotta. One hummingbird.`
- ✅ Eyebrow: `MADE TODAY` · Headline: `peach butterscotch.`

### Never use
- ❌ "indulge"
- ❌ "treat yourself"
- ❌ "premium"
- ❌ "made with love"
- ❌ "perfect for any occasion"
- ❌ "elevated", "experience", "journey", "seamless"
- ❌ Title Case headlines
- ❌ Emoji in product copy (the small `🐦` is allowed in the footer line, and *only* there)

### Examples in context
&gt; **Hero**
&gt; Made this morning.
&gt; No reason needed.
&gt; *Three flavors. One hummingbird. 89฿.*
&gt; [ Order on Line ]

&gt; **Product card · raspberry dark chocolate**
&gt; Bold. A little intense.
&gt; You had a day. You know you did.
&gt; *89฿*

&gt; **Footer line**
&gt; Find your sweet. 🐦
&gt; Line: @zucgoo · Bangkok · Made today.

---

## VISUAL FOUNDATIONS

### Colour
Six paints. Crimson + Cream do ~80% of every composition. The other four are **flavour accents** — they appear on a specific product, a specific sticker, a specific moment. Never as page surfaces.

| Token | Hex | Use |
|---|---|---|
| `--zg-crimson` | `#7B1A1A` | Primary brand red. All outlines, headlines, CTAs. |
| `--zg-cream` | `#F5E8D0` | Page background. Default surface. |
| `--zg-amber` | `#C8963E` | Honey/peach accent — Peach Butterscotch flavor, "made today" stamps. |
| `--zg-olive` | `#3B6D11` | Deep matcha green — Strawberry Matcha flavor, "real fruit" callouts. |
| `--zg-brown` | `#1A1A1A` | Near-black ink — beak, eyes, body type at small sizes. |
| `--zg-raspberry` | `#4A0A1E` | Deep purple-red — Raspberry Dark Chocolate flavor. |
| `--zg-cream-warm` | `#EFDEB5` | Card on cream. |
| `--zg-cream-shadow` | `#DBC58E` | Sticker shadow tint. |

**Two-tone rule:** any composition uses cream + crimson as ~80–95% of its area. Flavour accents = stickers, ribbons, or the colour of a specific product. They are never the background of a section.

### Type
- **Display: Dela Gothic One.** Heavy, chunky, lowercase always. Use for the wordmark, hero headlines, sticker labels. Tracking is tight (-0.01em); leading is *very* tight (0.92).
- **Body: DM Sans.** A friendly geometric for any text under ~24px. Dela can't go below ~28px without becoming mush.
- **Mono: JetBrains Mono.** Receipts, inventory codes, prices in fine print.

### Backgrounds
- **Default: solid cream paper.** No gradients. No noise on the primary surface.
- **Pattern (`assets/pattern-tile.png`)** appears in confined moments — section breaks, packaging interiors, banner blocks — never as a full-page wash.
- **Imagery is sticker, not photo.** When photographs appear, they're warm, slightly contrasty. Never cold. Never b&amp;w. The cream paper is always the lighter colour in the frame.

### Illustration
Every illustration is **outline on cream**, single-weight crimson stroke, no inner shading except a flat near-black for the deepest details (beak, pupils, claws). The mascot is always given the **sticker treatment**: a cream halo at ~14–18px around the silhouette, optionally paired with `--shadow-sticker` (`6px 6px 0 var(--zg-crimson)`) when placed against a busy backdrop.

### Animation
- **Easing:** `cubic-bezier(.34, 1.56, .64, 1)`. Slight overshoot, never linear.
- **Duration:** 180ms (micro), 320ms (default), 600ms (entrance).
- **Goo's entrance:** a small bob — translateY(-12px) and rotate 1° on a 4s loop.
- **Stickers:** pop on with scale 0→1 + 4° rotate-in.
- **Hover:** sticker elements lift 2px and may rotate ±1°.
- **Press:** the sticker shadow collapses (`6px 6px 0` → `0 0 0`) and the element translates `3px 3px`. The whole vocabulary should *feel like pressing a hand-stamp*.

### Hover / press states
| State | Treatment |
|---|---|
| Button hover | shadow grows by 2px, element lifts 1px |
| Button press | shadow → 0, element translates to where the shadow was |
| Link hover | colour shifts crimson → brown, underline 2px |
| Card hover | rotates -1° + small lift; never a colour change |

### Corner radii
Mostly generous (14–32px). Pure right angles are reserved for receipts, tickets, and signage where a hard edge feels honest. **Capsules (`--r-pill`)** are heavily used for tags, prices, and CTAs.

### Cards
A zucgoo card is **not a drop-shadow rectangle.** It's a sticker:
- 3px solid crimson border
- 14–22px radius
- `6px 6px 0` solid crimson shadow (offset, hard, no blur)
- Cream or cream-warm interior

Avoid: soft blurry box-shadows, colored-left-border accent cards, glassmorphism, neumorphism.

### Borders &amp; strokes
Outlines are **the** unifying mechanic. Default stroke is 3px solid crimson. Sticker stamps go to 5px. Hairlines (1.5px, 25%-tint crimson) appear inside dense data UIs.

### Transparency &amp; blur
Mostly avoided. The brand is opaque, printed, stamp-like. Legitimate uses: a low-opacity cream wash over the pattern tile when text needs to read, and the rare modal scrim.

### Layout
- A wide outer cream margin everywhere (`--sp-7`+ on desktop).
- Content floats as **stickers on paper**, slightly rotated (±1.5°) when celebratory, axis-aligned in product UI.
- **Fixed elements** (sticky nav, floating CTA) are sticker-style: pill or capsule, never the rectangular bar of the typical app.

### Imagery vibe
Warm. A whisper of grain on photography. No cool tones, no high-key clinical white. The cream paper is always the lighter of the two colours in any photo.

### The aesthetic, in one phrase
**Organic luxury.** Handmade but never messy. Feels like a good Bangkok café — intimate, specific, proud of what it makes.

---

## ICONOGRAPHY

zucgoo has **its own pictographic vocabulary** rather than a generic icon font. The brand stickers live in `assets/decor/`:

| Sticker | Variants | Meaning |
|---|---|---|
| `star-red.png` / `star-cream.png` | filled | featured, excellence |
| `starburst-red.png` / `starburst-cream.png` | scalloped seal | "made today", price stamp |
| `heart-red.png` / `heart-cream.png` | filled | favourite |
| `sparkles-red.png` / `sparkles-trio.png` | trio of diamonds | a little magic |
| `hat-red.png` / `hat-cream-bg.png` | Goo's cap alone | "Goo says hi" / community |
| `droplet-red.png` / `droplet-cream.png` | the "goo" mark | flavour callout, monogram |
| `droplet-red-leaves.png` / `droplet-cream-leaves.png` | droplet + leaves | "real fruit", natural |

The mascot itself (`assets/mascot/mascot-01.png` … `mascot-12-jar-alt.png`) is *not* an icon; it's the character **Goo**. Use one Goo per surface, never two side-by-side.

### For UI affordances (close, menu, chevron)
The brand has no native UI icon set, so we **substitute Lucide Icons** at stroke-width 2.25px in `var(--zg-crimson)`.

```html
&lt;script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"&gt;&lt;/script&gt;
&lt;i data-lucide="x" style="color: var(--zg-crimson); stroke-width: 2.25"&gt;&lt;/i&gt;
&lt;script&gt;lucide.createIcons();&lt;/script&gt;
```

&gt; ⚠️ **Substitution flag:** Lucide is our nearest match, *not* in the brand book. Replace if/when zucgoo defines its own affordance set.

### Emoji
Avoid in product/marketing copy. The mascot does the emotional work. **No exceptions** — Goo himself is the brand's signature.

---

## File index

```
Zucgoo Design System/
├── README.md                ← you are here
├── SKILL.md                 ← skill manifest (Claude Code compatible)
├── colors_and_type.css      ← all tokens (import this)
├── fonts/
│   └── DelaGothicOne-Regular.ttf
├── assets/
│   ├── logo-primary.png     ← Goo + wordmark lockup
│   ├── logo-badge.png       ← oval seal
│   ├── pattern-tile.png     ← repeating wordmark+droplet pattern
│   ├── mascot/              ← 12 Goo poses
│   └── decor/               ← cream + crimson stickers
├── preview/                 ← cards rendered into the Design System tab
└── ui_kits/
    └── marketing-site/      ← zucgoo.com recreation (single-page shop)
```

---

## Quick start

```html
&lt;link rel="stylesheet" href="colors_and_type.css"&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"&gt;

&lt;body&gt;
  &lt;div class="eyebrow"&gt;Made today&lt;/div&gt;
  &lt;h1&gt;find your sweet.&lt;/h1&gt;
  &lt;p&gt;Three panna cotta. One hummingbird. 89฿.&lt;/p&gt;
&lt;/body&gt;
```

</design-system-guide>
</attached-skill>

## Assistant

_[tool: list_files]_

_[tool: list_files]_

I've read the full Deal spec and the Zucgoo design system guide. Before I build anything, I need to flag something important and get your direction — let me peek at the project and the bound design system first.

_[tool: questions_v2]_

There's a real conflict I need to resolve with you before building.

You've handed me an extremely detailed, self-contained spec for **Deal** — a dark, near-black, mint-green negotiation co-pilot. It has its own complete design system (colors, type, components, 10 screens).

But this project has the **Zucgoo Design System** bound to it — a *light cream + crimson, playful Bangkok panna cotta brand* with a hummingbird mascot, Dela Gothic One display type, sticker-style cards, and a warm "organic luxury" feel. The two are aesthetic opposites in nearly every dimension (dark vs. cream, mint vs. crimson, cockpit-precise vs. handmade-warm).

I can't honor both at once, so I need you to point me. A few quick questions 👇

## User

not zucgoo design systwem

## Assistant

_[tool: set_project_title]_

_[tool: update_todos]_

_[tool: copy_starter_component]_

Got it — ignore Zucgoo entirely and build **Deal** exactly to its own spec: dark, mint-green Signal, precise. I'll make it a fully interactive clickable prototype of the core flow inside an iOS frame, with the live session screen breathing (LIVE dot, thinking dots, mic state, fade-ins). Let me set up.Let me inspect the iOS frame so I integrate cleanly.

_[tool: read_file]_

_[tool: copy_starter_component]_

The frame is clear. Let me grab the Tweaks panel starter, then build. I'll architect this as several JSX files imported into one HTML.

_[tool: write_file]_

Now I'll build. Starting with design tokens and base components.

_[tool: write_file]_

Now the base component library.

_[tool: write_file]_

Now the shared chrome (top bars, tab bar, bottom sheet) and demo data.

_[tool: write_file]_

Now the core screens (splash, dashboard, setup, strategy brief).

_[tool: write_file]_

Now setup forms + strategy brief.

_[tool: write_file]_

Now the heart of the app — the live session screen with all its alive states.

_[tool: write_file]_

Now session end, debrief (with count-ups), and the shareable win card.

_[tool: write_file]_

Now the app router + Tweaks, then assemble the HTML.

_[tool: str_replace_edit]_

A couple of wiring fixes: `LiveScreen` and `StrategyScreen` need to consume the toned moves I pass them, and I need the glow CSS.

_[tool: str_replace_edit]_

Now the glow CSS and the main HTML file.

_[tool: str_replace_edit]_

_[tool: write_file]_

Let me check it renders.

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Device frame renders but content is blank — likely a JS error. Let me check logs.

_[tool: sleep]_

_[tool: screenshot]_

_[tool: eval_js]_

Still blank. Let me probe the DOM to see what actually rendered.

_[tool: eval_js]_

Content is in the DOM (text is there) but invisible. Let me check computed styles — likely an opacity/animation issue.

_[tool: eval_js]_

The screen is stuck at the animation's `from` state (opacity 0). Let me inspect the animation properties.

_[tool: eval_js]_

`currentTime` is stuck at 0 while "running" — the element is almost certainly remounting every render (animation restarts each frame). That points to an App re-render loop, likely from `useTweaks`. Let me check it.

_[tool: str_replace_edit]_

Found it: `document.timeline.currentTime` is 0 — rAF/animation timeline is frozen in this preview context, so the `opacity:0` entrance state (with `fill: both`) never resolves to visible. The fix per best practice: make the **visible state the base**, and only animate when a JS-set `data-anim="on"` flag is present (set via rAF after mount). If the timeline is frozen, the flag never sets and content stays visible.

_[tool: str_replace_edit]_

_[tool: show_html]_

The splash renders beautifully now. Let me click through the full flow to verify each screen — dashboard, setup, strategy, live (the core), debrief, win card.

_[tool: update_todos]_

_[tool: multi_screenshot]_

Let me click through the whole flow and capture key screens.

_[tool: multi_screenshot]_

The helper didn't persist across steps. Let me attach it to `window` and drive the flow to the core screens.

_[tool: eval_js]_

Dashboard looks great. The hero CTA didn't match (its text starts with "START NEGOTIATION"). Let me reload and drive with substring matching to reach the live screen — and investigate that blank frame.

_[tool: sleep]_

_[tool: multi_screenshot]_

_[tool: str_replace_edit]_

Driving splash via screenshots is tedious. Let me expose a tiny nav hook for testing/verification, then jump straight to each screen.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

The core flow works perfectly — strategy → live move 1 (ANCHOR) → thinking → move 2 (MIRROR) with history. Now let me verify session end, debrief (count-ups), win card, and the mic state.

_[tool: str_replace_edit]_

All ten screens work — session end, debrief, the shareable win card, and the mic "Listening…" state all render correctly. One robustness issue: the count-up numbers show **+$0 / 0.0** because, like the entrance animations, `requestAnimationFrame` is frozen in this capture context. For a live user it animates, but I'll make it bulletproof by initializing to the final value (so a frozen timeline shows the real number, and a live one still counts up).

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: eval_js]_

Debrief and win card now show the real numbers. Let me verify the Tweaks panel mounts and recolors correctly by activating edit mode.

_[tool: screenshot]_

_[tool: eval_js]_

Panel looks great. Let me test the blue signal palette and tone change to confirm they propagate.

_[tool: eval_js]_

_[tool: multi_screenshot]_

Palette swap works (now blue). Let me see it applied, then reset to mint.

_[tool: eval_js]_

Blue propagates everywhere (badge, glow, SAY THIS, buttons) while walk-away stays semantic red. Since tweaks persist to localStorage, let me reset to the default mint theme so the user lands on the intended look.

## User

how can I down load this mock up

## Assistant

You can download it as a single self-contained HTML file that runs offline (just double-click to open in any browser). Let me package it for you — I need to add a small splash thumbnail the bundler requires, then bundle.

_[tool: read_file]_

I'll add the splash thumbnail the bundler needs (Deal's diamond mark on its dark background), then bundle into one offline file.

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

Let me verify the standalone bundle actually runs (it inlines React + Babel, so it works fully offline).

_[tool: show_html]_

_[tool: show_html]_

Frame renders; Babel is still compiling the inlined scripts. Let me wait and recheck.

_[tool: sleep]_

_[tool: screenshot]_

Still blank — the bundle broke something the multi-file version didn't. Let me check the console.

_[tool: get_webview_logs]_

_[tool: eval_js]_

Content is actually in the DOM (8KB rendered, App defined). The screenshot tool may have captured mid-compile. Let me check actual visibility.

_[tool: eval_js]_

Found it. The entrance animations use `opacity: 0` keyframes held with `fill: both`. In this offline/capture context the animation timeline is frozen, so they get stuck on frame 0 (invisible) instead of resolving to visible. CSS keyframe entrances can't degrade gracefully — but CSS **transitions** can (they jump straight to the end state when frozen). Let me replace the entrance system with a transition-based `Reveal` and neutralize the risky utility classes.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now wire `Reveal` into the screen wrapper, move card, thinking card, and win card — and drop the now-unneeded `animOn` gating in app.jsx.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now remove the obsolete `animOn` gating from app.jsx.

_[tool: str_replace_edit]_

Now re-bundle and verify the standalone renders.

_[tool: super_inline_html]_

_[tool: show_html]_

The standalone bundle now renders perfectly offline. Let me present it for download.

_[tool: present_fs_item_for_download]_

Your download is ready — click the card above. 👆

**`Deal (standalone).html`** is a single self-contained file (~1.9 MB). Everything's baked in (React, fonts, all screens), so it works offline — just **double-click to open in any browser**, or send it to anyone and it'll run on their machine too.

Two other ways to grab it, if you prefer:
- **Whole project** — say the word and I'll zip up all the source files (editable JSX) for download.
- **PDF / images** — I can also export static screen captures if you want something to drop into a slide or doc.

Want me to also reset the theme back to the default mint (your earlier tweaks are saved locally), or is the blue/other palette where you want it?

## User

how can i edit this in my local

## Assistant

To edit it locally you need the **source files** (the standalone download is bundled/minified — not editable). Let me package the editable source into a clean folder for you.

_[tool: copy_files]_

Let me add a short README so the setup steps travel with the files.

_[tool: write_file]_

_[tool: present_fs_item_for_download]_

Download the **`Deal-source`** folder above — it's a zip of all the editable files plus a `README.md` with these same steps.

**The one gotcha:** don't just double-click `Deal.html`. The page loads its `.jsx` files over HTTP, which browsers block for local files. So serve the folder:

```bash
cd Deal-source
python3 -m http.server 8000
```

Then open **http://localhost:8000/Deal.html**. (First load needs internet — React, Babel, and fonts come from a CDN.)

**To edit:** each `.jsx` file is plain JSX — change it, save, refresh the browser. No build step. Quick map:
- **The negotiation script** (the moves) → `chrome.jsx`, `DEMO.moves`
- **Colors** → `deal-tokens.css` (`--deal-signal…`)
- **A screen's copy/layout** → its own `screens-*.jsx` file
- **Add/route a screen** → `app.jsx`

If you'd rather work in a single file (no folder, no server — just double-click), I can inline everything into one editable `Deal.html` instead. Want that version?

