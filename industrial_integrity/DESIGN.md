---
name: Industrial Integrity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d9d9e0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fa'
  surface-container: '#ededf4'
  surface-container-high: '#e8e8ee'
  surface-container-highest: '#e2e2e8'
  on-surface: '#1a1c20'
  on-surface-variant: '#434751'
  inverse-surface: '#2e3035'
  inverse-on-surface: '#f0f0f7'
  outline: '#737782'
  outline-variant: '#c3c6d2'
  surface-tint: '#2f5ea3'
  primary: '#002b5c'
  on-primary: '#ffffff'
  primary-container: '#004185'
  on-primary-container: '#85affa'
  inverse-primary: '#aac7ff'
  secondary: '#575f67'
  on-secondary: '#ffffff'
  secondary-container: '#d8e1ea'
  on-secondary-container: '#5b646b'
  tertiary: '#4f1d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#722d00'
  on-tertiary-container: '#f99562'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#0b468a'
  secondary-fixed: '#dbe4ed'
  secondary-fixed-dim: '#bfc8d0'
  on-secondary-fixed: '#141d23'
  on-secondary-fixed-variant: '#3f484f'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb692'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783103'
  background: '#f9f9ff'
  on-background: '#1a1c20'
  surface-variant: '#e2e2e8'
  status-normal: '#007BFF'
  status-caution: '#F59E0B'
  status-critical: '#DC2626'
  steel-silver: '#E9ECEF'
  success-green: '#10B981'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin: 24px
  card-padding: 20px
  table-cell-padding: 8px 12px
---

## Brand & Style

The design system is engineered for high-stakes manufacturing environments where precision, reliability, and data integrity are paramount. It centers on a **Corporate / Modern** aesthetic with a strong emphasis on functional density and analytical clarity. 

The visual narrative is "Data-First, AI-Supported," moving away from decorative flourishes to focus on systematic hierarchy. The interface evokes a sense of industrial stability through a structured grid, restrained color application, and clear status signaling. It is designed to minimize cognitive load during complex root-cause analysis while maintaining the authoritative presence of an enterprise-grade engineering tool.

## Colors

The palette is anchored by **Posco Blue (#004185)**, representing institutional trust and technical expertise. The color system follows a strict functional logic to ensure safety and immediate recognition in factory environments.

- **Primary:** Used for brand presence, primary actions, and active navigation states.
- **Secondary (Steel Silver):** Used for structural elements, borders, and inactive backgrounds to provide an industrial, clean feel.
- **Functional Status:** 
    - **Normal:** Blue is used for "safe" or "baseline" metrics to maintain brand alignment even in status reporting.
    - **Caution:** Amber signals repeated defects or minor deviations requiring attention.
    - **Critical:** Red is reserved for immediate out-of-spec conditions and severe risk.
- **Neutral:** A range of cool grays (derived from the steel silver) facilitates a tiered surface strategy, moving from a light gray page background to white content cards.

## Typography

The system utilizes **Hanken Grotesk** for its exceptional legibility and modern, technical character. It provides a clean, neutral canvas for data-heavy interfaces. To support the technical nature of manufacturing data, **JetBrains Mono** is employed for raw data previews, CSV headers, and Lot numbers, ensuring character distinction (e.g., distinguishing '0' from 'O').

Typography is strictly hierarchical:
- **Headlines:** Bold and direct, used for page titles and major section headers.
- **Labels:** Uppercase with slight letter spacing for data keys and table headers to improve scanning.
- **Data Mono:** Specifically for technical strings, ensuring columns of numbers and IDs align perfectly for visual comparison.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy for dashboard views to maintain consistent information density, transitioning to a structured 12-column layout for forms and reports.

- **Dashboard Layout:** A multi-column approach (typically 4-5 columns) for KPI cards at the top, followed by a 2-column "Context & Detail" split (60/40) for charts and their associated data lists.
- **Rhythm:** An 8px linear scale is used for spatial relationships, but a 4px "half-step" is permitted for high-density data tables and compact UI controls.
- **Workflow Stepper:** A horizontal persistent progress indicator at the top of the viewport guides the user through the 4-step analysis pipeline (Data Selection ??Dashboard ??Cause Analysis ??Report).

## Elevation & Depth

To maintain an industrial and professional feel, the system avoids heavy shadows, instead using **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Background):** A subtle cool-gray base (`#F8F9FA`).
- **Level 1 (Cards/Containers):** Pure white surfaces with a 1px solid border (`#DEE2E6`). No shadows are used for standard containers to keep the interface flat and efficient.
- **Level 2 (Active/Interactive):** Subtle ambient shadows (0px 2px 4px, 5% opacity) are reserved exclusively for interactive elements like hovered buttons or active dropdowns.
- **Level 3 (Overlays):** Modals and flyouts use a slightly more pronounced shadow and a backdrop blur to separate critical "Evidence" views or AI explanation panels from the underlying data.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the industrial data while maintaining a precise, engineered appearance.

- **Components:** Buttons, input fields, and tags use the 4px (`0.25rem`) radius.
- **Containers:** Large cards and modals use 8px (`0.5rem`) to provide a clear containment boundary.
- **Data Points:** Markers in scatterplots and charts should be crisp (circular or square) to ensure mathematical precision is visually communicated.

## Components

### Buttons & Controls
- **Primary Button:** Solid Posco Blue with white text. High-contrast, sharp corners (4px).
- **Secondary/Ghost:** 1px border using Steel Silver; used for secondary actions like "Download CSV."
- **Status Pills:** Small, high-density tags with background tints and dark text (e.g., Light Red background with Dark Red text) for "Critical" status.

### KPI Cards
- Large numeric value in the center using `display-lg`.
- Small trend indicator (Up/Down arrow) next to the value.
- Clear title at the top left using `label-bold`.

### Data Tables
- **Header:** Light gray background (`#F1F3F5`) with `label-bold` text.
- **Rows:** Zebra-striping is avoided; use 1px horizontal dividers only.
- **Density:** High density (small padding) to maximize information on screen.

### Process Status Indicators
- Use the 3-tier traffic light system (Blue/Amber/Red).
- Indicators must combine a color-coded icon (Circle) with a text label for accessibility.

### Input Fields
- Structured for data entry: 1px border, clear focus state using a 2px Posco Blue outline.
- Multi-step forms use a "validation-first" approach where the "Next" button is disabled until the current step's required parameters are satisfied.
