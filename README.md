# Todo-List (React Native) — Project Documentation

## Overview
- **Goal**: A lightweight, mobile Todo app with categories, subtasks, and a simple calendar.
- **Focus**: Clean component design, smooth interactions, strict style tokens, and minimal state.
- **Key UX**:
  - Expandable lists with a parent checkbox controlling all subtasks.
  - Subtasks editable in context.
  - Calendar ribbon and daily agenda scaffolding.

## Tech Stack
- **Runtime/UI**: React Native
- **Navigation**: React Navigation stack (`src/navigation/AppStackNav.tsx`)
- **UI tokens**: `palette`, `typography`, `spacing`, `layout` (`src/core/styles/`)
- **SVG**: `react-native-svg` for icons (e.g., `src/screens/home/Home.tsx`)
- **Checkbox**: `@react-native-community/checkbox`
- **Animation**: `LayoutAnimation` + Android UIManager enablement
- **Architecture**: Smart/dumb container split via co-located hooks (`useXLogic.ts[x]`) next to UI `.tsx` files.

## Directory Structure
- **`src/components/Accordion/`**
  - `Accordion.tsx`: Expandable list with parent checkbox; passes state to subtasks.
  - `Accordion.styles.ts`: Row layout, spacing, typography.
  - `useAccordionLogic.ts`: Hook for checkbox/expand state and Android UIManager enablement.
- **`src/components/SubList/`**
  - `SubList.tsx`: Subtask row with checkbox and text input; synced with parent.
  - `SubList.styles.ts`: Stable layout for checkbox + input alignment.
  - `useSubListLogic.ts`: Hook for checkbox/text state and parent sync.
- **`src/screens/home/`**
  - `Home.tsx`: Header showing “Today” plus date, categories, and list accordions.
  - `useHomeLogic.tsx`: Provides memoized `today` and `categories`.
- **`src/screens/calendar/`**
  - `Calendar.tsx`: Date ribbon and agenda scaffolding; header date uses shared util.
  - `useCalendarLogic.ts`: Date generation, scroll refs, and helpers (`formatDayOfWeek`, `isSameDay`, `dateKey`, `formatTime`), plus exported `TIME_SLOTS`.
- **`src/screens/task/`**
  - `Task.tsx`: Task detail/edit screen scaffold.
  - `useTaskLogic.ts`: Manages `isViewMode`, `title`, and `subLists`.
- **`src/navigation/`**
  - `AppStackNav.tsx`: Stack routes and typed params (`AppStackNavParams`).
- **`src/core/`**
  - `constants.ts`: Sample data for lists and subtasks.
  - `utils.ts`: `formatHeaderDate(date)` utility.
  - `styles/`: `palette.ts`, `typography.ts`, `spacing.ts`, `layout.ts`, `common.ts`, `index.ts`.

## Smart/Dumb Containers
- **Presentational files**: `*.tsx` render UI only and consume data/handlers from hooks.
- **Logic hooks**: `useXLogic.ts[x]` co-located with each UI file manage state, refs, effects, and helpers.
- **Benefits**: Clear separation of concerns, improved testability, and simpler reuse.

## Data Model
- **List**: `{ id, title, tag, tagBackground, tagColor, subLists }`
- **SubList**: `{ id, title }`
- Data is currently static (`src/core/constants.ts`). Ideal for prototyping; can be replaced by API or storage later.

## Key Components & Interactions

- **`Accordion` (`src/components/Accordion/Accordion.tsx`)**
  - Logic (`useAccordionLogic.ts`):
    - `expanded`: shows/hides subtasks; uses `LayoutAnimation` for smoothness.
    - `toggleCheckBox`: parent checkbox state.
  - Parent checkbox controls subtasks by passing `parentChecked={toggleCheckBox}` to each `SubList`.
  - Android: `UIManager.setLayoutAnimationEnabledExperimental(true)` for animations.
  - UX niceties:
    - Title press toggles the parent checkbox.
    - Container uses gap-based spacing for consistent row layout.

- **`SubList` (`src/components/SubList/SubList.tsx`)**
  - Logic (`useSubListLogic.ts`):
    - `toggleCheckBox`: subtask checkbox.
    - `text`: input field content (seeded from `list?.title`).
  - Sync with parent (in hook):
    - `useEffect` listens to `parentChecked` and updates local checkbox accordingly.
  - Input interaction:
    - When `disabled` is `true`, the `TextInput` is wrapped by a `Pressable` so tapping the text toggles the checkbox (input itself is non-editable).
  - Layout stability:
    - Fixed-size checkbox container (`styles.checkbox`) prevents overlap/clipping.
    - Text uses defined typography and flexible width via `layout.flex1` when editable.

## Styling System
- **Tokens** live in `src/core/styles/`:
  - **`palette.ts`**: Color constants.
  - **`typography.ts`**: Size, weight, line-heights; e.g., `typography.text18`.
  - **`spacing.ts`**: Margin/padding helpers; e.g., `spacing.marginTop20`.
  - **`layout.ts`**: Primitives like `flex1` for consistent layout semantics.
  - **`common.ts`**: Shared one-offs like `common.line`.
- **Rationale**: Central tokens enforce visual consistency and simplify global changes.

## Navigation
- **Stack navigation** via `AppStackNav.tsx`:
  - Typed params (`AppStackNavParams`) for safer routing.
  - Screens: `Home`, `Task`, `Calendar` (as referenced in imports).

## Utilities
- **`formatHeaderDate(date)`** (`src/core/utils.ts`):
  - Used by `Home` and `Calendar` to render dates like “11 Oct”.
  - Centralized for consistency and testability.

## Thought Process & Design Decisions

- **Local-first state**:
  - `SubList` owns its own checkbox and text state for responsiveness and isolation.
  - Parent (`Accordion`) influences children through a single prop (`parentChecked`) to keep contracts minimal and predictable.
- **Unidirectional data flow**:
  - Parent → child prop sync avoids complex bi-directional state coupling.
  - Children still remain interactive independently (e.g., individual subtask toggles).
- **Progressive enhancement**:
  - Smooth animations using `LayoutAnimation`, guarded for Android.
  - Pressable affordances:
    - Tapping the title toggles parent checkbox.
    - Tapping disabled subtask text toggles its checkbox.
- **Layout stability**:
  - Removed jitter sources (negative margins; replaced `gap` clashes).
  - Fixed checkbox bounds avoid text clipping; inputs flex correctly.
- **Style tokens**:
  - Palette/typography centralization reduces duplication and enforces brand consistency.
- **Path hygiene**:
  - Absolute-style imports like `core/styles` and `components/Accordion` keep imports clean and refactor-friendly.

## How to Run
- Start Metro from project root:
  - npm: `npm start`
  - Yarn: `yarn start`
- Build and run:
  - Android: `npm run android` or `yarn android`
  - iOS: `npm run ios` or `yarn ios`

## Extending the App

- **Persist data**:
  - Add storage (AsyncStorage/SQLite) or a backend API to replace `src/core/constants.ts`.
- **Completion metrics**:
  - Compute completed subtasks vs total; render progress bars/tags.
- **Bulk actions**:
  - Clear completed, reorder subtasks, due dates.
- **Accessibility**:
  - Add `accessibilityRole`, `accessibilityLabel` for Pressables/checkboxes.
- **Testing**:
  - Add unit tests for `formatHeaderDate`, and component tests for `Accordion`/`SubList` interactions.

## Known Trade-offs
- **Static data**: Ideal for demo; not persisted.
- **Key uniqueness**: Ensure `subLists` IDs are unique within each list to avoid React key collisions.
- **Layout gap support**: `gap` relies on RN version/platform support; fall back to margins if needed.

## Recommended Actions
- **[persist-data]** Replace `src/core/constants.ts` with a store (e.g., Redux/Zustand) or AsyncStorage.
- **[accessibility]** Add accessibility props to interactive elements.
- **[tests]** Add component tests for parent-child checkbox sync and title/text tapping behavior.

## Status
- Documentation added reflecting current components, screens, utilities, styles, and design rationale.
