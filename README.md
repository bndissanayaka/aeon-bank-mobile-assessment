# AEON Bank Mobile Engineer Assessment

A React Native mobile application that allows banking customers to view their latest transactions, inspect transaction details, and share transaction information using the native share sheet.

The focus of this implementation is clean engineering practices, maintainable architecture, type safety, and production-ready structure rather than heavy UI customization.

## Tech Stack

- React Native
- TypeScript
- Zustand
- React Navigation
- Jest
- React Native Share API

## Features

- View latest transactions
- Transactions sorted from newest to oldest
- Positive amounts displayed in green
- Negative amounts displayed in red
- View transaction details
- Native transaction sharing using `Share.share()`
- Loading state
- Error state with retry
- Empty state
- Pull-to-refresh
- Type-safe navigation
- Reusable UI components
- Unit tests for utility and business logic

## Project Structure

```text
src/
├── api/
│   └── transactionApi.ts
├── components/
│   ├── DetailRow.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── LoadingState.tsx
│   └── TransactionItem.tsx
├── mocks/
│   └── transactions.ts
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts
├── screens/
│   ├── TransactionDetailScreen.tsx
│   └── TransactionListScreen.tsx
├── store/
│   └── transactionStore.ts
├── types/
│   └── transaction.ts
└── utils/
    ├── formatCurrency.ts
    ├── formatDate.ts
    └── shareTransaction.ts
```

## Architecture

The application separates presentation, state management, and data access responsibilities.

```text
Screen
  ↓
Zustand Store
  ↓
Transaction API Layer
  ↓
Mock Backend Response
```

### Screen Layer

Screens are responsible for:

- rendering UI
- reacting to user interaction
- triggering store actions
- navigation

Screens do not directly own backend logic or data transformation.

### State Management

Zustand is used for centralized transaction state.

The transaction store manages:

- transaction data
- initial loading state
- refresh state
- error state
- transaction lookup by reference ID

Zustand was selected because it provides lightweight centralized state management with minimal boilerplate and is appropriate for the scope of this application.

### API Layer

The API layer abstracts the data source from the UI and store.

Currently the application uses mock backend data, but the implementation can later be replaced with a real REST API without changing the screens.

For example:

```text
Current:
Screen → Store → Mock API

Future:
Screen → Store → REST API
```

### Navigation

Navigation is strongly typed using `RootStackParamList`.

Only the transaction reference ID is passed to the transaction detail screen rather than passing the entire transaction object.

```ts
navigation.navigate('TransactionDetail', {
  transactionId: item.refId,
});
```

The detail screen retrieves the latest transaction data from Zustand.

This avoids duplicating domain data in navigation state and reduces the risk of stale transaction information.

## Transaction Ordering

Transactions are sorted by `transferDate` from newest to oldest before they reach the UI.

The original response array is copied before sorting to avoid mutating the source data.

```ts
return [...mockTransactionResponse.data].sort(
  (a, b) =>
    new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime(),
);
```

## Loading and Refresh States

Initial loading and pull-to-refresh are treated as separate states.

This allows the application to show a full loading state on first load while keeping existing transactions visible during refresh.

```text
Initial load
→ Full loading state

Pull to refresh
→ Existing list remains visible
→ Native refresh indicator is shown
```

## Error Handling

Basic error handling is implemented for transaction loading and refreshing.

If the initial request fails, the user is shown an error state with a retry option.

If a refresh fails after transactions have already loaded, the existing data remains available rather than being removed.

This prevents transient network failures from unnecessarily hiding previously loaded information.

## Reusable Components

Repeated UI patterns are extracted into reusable components, including:

- `TransactionItem`
- `DetailRow`
- `LoadingState`
- `ErrorState`
- `EmptyState`

This keeps screens focused on orchestration instead of presentation details.

## Sharing

Transaction details can be shared using React Native's native `Share.share()` API.

The share message includes:

- reference ID
- transaction name
- recipient name
- transfer date
- transfer amount

This opens the platform-native share sheet so users can choose their preferred sharing method.

## Accessibility

Interactive transaction rows and the share button include accessibility roles and labels.

This improves compatibility with screen readers while keeping the implementation lightweight.

## Getting Started

### Prerequisites

Ensure the following tools are installed:

- Node.js 22 or later
- npm
- Xcode for iOS development
- CocoaPods / Bundler
- Android Studio for Android development

## Installation

Clone the repository:

```bash
git clone https://github.com/bndissanayaka/aeon-bank-mobile-assessment
```

Move into the project directory:

```bash
cd AeonBankAssessment
```

Install JavaScript dependencies:

```bash
npm install
```

## Running on iOS

Install iOS dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Start Metro:

```bash
npm start
```

Then in another terminal:

```bash
npm run ios
```

Alternatively, open:

```text
ios/AeonBankAssessment.xcworkspace
```

in Xcode and run the application from there.

## Running on Android

Start an Android emulator or connect a physical Android device.

Then run:

```bash
npm run android
```

## Type Checking

Run:

```bash
npx tsc --noEmit
```

## Linting

Run:

```bash
npm run lint
```

## Testing

Run the test suite:

```bash
npm test -- --runInBand
```

The current test suite covers:

- positive currency formatting
- negative currency formatting
- short date formatting
- detailed date formatting
- latest-first transaction ordering

The tests focus on deterministic utility and business logic rather than implementation details.

## Assumptions

- Positive amounts represent incoming transactions.
- Negative amounts represent outgoing transactions.
- Backend timestamps are provided in UTC ISO format.
- MYR is used as the display currency.
- `refId` is unique for each transaction.
- The mock API represents the expected backend response structure.
- The supplied transaction values are preserved as provided by the assessment.

## Engineering Decisions

### Why Zustand?

Zustand provides centralized state with significantly less boilerplate than heavier state management libraries.

It also allows transaction state to be shared between the transaction list and detail screens without passing complete transaction objects through navigation.

### Why an API Layer?

The API layer keeps data access separate from presentation and state management.

This allows the mock implementation to be replaced by a real backend later without requiring changes to the UI.

### Why FlatList?

Transaction history can grow significantly in a real banking application.

`FlatList` provides:

- virtualization
- efficient rendering
- stable key handling
- pull-to-refresh support
- empty-state support

This makes it more appropriate than rendering all transactions inside a `ScrollView`.

### Why Pass Only the Transaction ID?

The full transaction already exists in application state.

Passing only the reference ID avoids duplicating transaction data inside navigation state and ensures the detail screen reads the latest available version from the store.

### Why Separate Loading and Refreshing?

Initial loading and refresh represent different user experiences.

A full loader is appropriate when no data exists yet, while pull-to-refresh should keep the current transaction list visible.

## Future Improvements

Given more time, the following improvements could be added:

- Replace the mock API with a real backend integration
- Add API pagination for larger transaction histories
- Add request caching
- Add retry policies with exponential backoff
- Add structured error models
- Add authentication and secure API communication
- Add end-to-end testing
- Add component integration tests
- Add offline support
- Add localization
- Add multi-currency support
- Add centralized theme and design tokens
- Add analytics and production logging
- Add deep linking to transaction detail screens
- Add transaction search and filtering
- Add transaction grouping by date
- Add CI checks for linting, type checking, and tests

## Validation

Before submission, the project was validated using:

```bash
npx tsc --noEmit
npm test -- --runInBand
npm run lint
```

All checks passed successfully.
