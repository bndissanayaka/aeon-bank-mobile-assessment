# AEON Bank Mobile Engineer Assessment

A React Native application that displays a customer's latest transactions and allows users to view and share transaction details.

## Tech Stack

- React Native
- TypeScript
- Zustand
- React Navigation
- Jest

## Features

- View latest transactions
- Transactions sorted newest first
- Positive amounts shown in green
- Negative amounts shown in red
- Transaction detail screen
- Native share functionality
- Loading state
- Error state with retry
- Empty state
- Pull-to-refresh
- Type-safe navigation
- Unit tests

## Project Structure

src/
├── api/
├── components/
├── mocks/
├── navigation/
├── screens/
├── store/
├── types/
└── utils/

## Architecture

The application separates UI, application state, and data access.

Screen
↓
Zustand Store
↓
API Layer
↓
Mock Backend Response

The screens are kept focused on presentation and user interaction, while the Zustand store manages transaction state and async actions.

The API layer abstracts the data source so the mock implementation can later be replaced by a real backend without changing the UI layer.

## Navigation

Navigation is strongly typed using `RootStackParamList`.

Only the transaction `refId` is passed to the detail screen instead of passing the entire transaction object.

This avoids duplicating application state in navigation parameters and reduces the chance of stale data.

## State Management

Zustand was selected because it provides lightweight centralized state management with minimal boilerplate.

The store manages:

- transactions
- initial loading state
- refresh state
- error state
- transaction lookup

Initial loading and refreshing are represented separately so pull-to-refresh does not replace existing data with a full-screen loader.

## Running the Project

### Prerequisites

- Node.js 22+
- Xcode
- CocoaPods
- Android Studio for Android

### Install dependencies

npm install

### iOS

cd ios
bundle install
bundle exec pod install
cd ..

npm run ios

### Android

npm run android

## Running Tests

npm test -- --runInBand

## Testing

The current test suite covers:

- currency formatting
- date formatting
- latest-first transaction sorting

The tests focus on deterministic business and utility logic rather than implementation details.

## Assumptions

- Positive amounts represent incoming transactions.
- Negative amounts represent outgoing transactions.
- Backend timestamps are provided in UTC.
- MYR is used as the display currency.
- `refId` is unique per transaction.

## Future Improvements

- Replace mock API with a real backend service.
- Add pagination for large transaction histories.
- Add request caching and retry policies.
- Add structured API error types.
- Add component and integration tests.
- Add end-to-end tests.
- Add localization and multi-currency support.
- Add a centralized design system/theme.
- Add analytics and production logging.
