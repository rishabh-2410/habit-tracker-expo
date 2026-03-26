# Habit Expo

A mobile habit-tracking app built with **React Native** and **Expo**. Track daily habits, view streaks, and visualise your daily progress.

> _Track your habits, transform your life._

---

## Tech Stack

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| Framework    | React Native 0.83 + Expo 55            |
| Routing      | Expo Router (file-based)               |
| Styling      | NativeWind (Tailwind CSS) + StyleSheet |
| Server State | TanStack React Query                   |
| Client State | Zustand                                |
| Forms        | React Hook Form + Zod                  |
| HTTP         | Axios                                  |
| Auth Storage | Expo Secure Store                      |
| Charts       | react-native-chart-kit                 |
| Animations   | React Native Reanimated                |

---

## Project Structure

```
src/
 ├── api/                   # Axios client & endpoint functions
 │   ├── client.api.ts      #   Base instance + auth interceptor
 │   ├── auth.api.ts        #   Login / register
 │   └── habits.api.ts      #   CRUD habits, stats, history, mark-done
 │
 ├── app/                   # Expo Router file-based routes
 │   ├── _layout.tsx        #   Root Stack (ThemeProvider + QueryProvider)
 │   ├── index.tsx          #   Entry: token check -> redirect
 │   ├── (auth)/            #   Auth group (Stack)
 │   │   ├── login.tsx
 │   │   ├── register.tsx
 │   │   └── forgot-passwd.tsx
 │   ├── habits/            #   Main app (Tab navigator)
 │   │   ├── index.tsx      #     Home: habit list
 │   │   └── profile.tsx    #     Profile + logout
 │   └── habit/
 │       └── [id].tsx       #   Habit detail: stats + activity chart
 │
 ├── components/            # Reusable UI components
 │   ├── habit-list.tsx
 │   ├── habit-item.tsx
 │   ├── habit-activity-chart.tsx
 │   ├── stat-card.tsx
 │   ├── login-form.tsx
 │   ├── register-form.tsx
 │   └── ...
 │
 ├── hooks/                 # React Query hooks
 │   └── user-habits.ts     #   useHabits, useHabitStats, useHabitHistory,
 │                           #   useMarkHabitDone
 │
 ├── interfaces/            # TypeScript types
 │   ├── habit.ts
 │   └── habitStats.ts
 │
 ├── providers/
 │   └── QueryProvider.tsx  # TanStack React Query context
 │
 ├── storage/
 │   └── tokenStorage.ts    # Expo Secure Store helpers (save/get/remove)
 │
 └── store/
     └── auth.store.ts      # Zustand auth state (user, token)
```

---

## Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────────────┐
│                    Expo Router                        │
│              (file-based navigation)                  │
├───────────┬────────────────┬─────────────────────────┤
│  (auth)   │    habits      │      habit/[id]          │
│  Login    │  Home   Prof.  │  Stats + Activity Chart  │
├───────────┴────────────────┴─────────────────────────┤
│                   Components                          │
│  LoginForm  HabitList  HabitItem  StatCard            │
│                HabitActivityChart                      │
├──────────────────────────────────────────────────────┤
│               Hooks (React Query)                     │
│  useHabits  useHabitStats  useHabitHistory             │
│                useMarkHabitDone                        │
├────────────────────────┬─────────────────────────────┤
│    Zustand Store       │       API Layer (Axios)      │
│    (auth state)        │  client.api + interceptor    │
├────────────────────────┼─────────────────────────────┤
│   Expo Secure Store    │      Backend (REST API)      │
│   (JWT persistence)    │     localhost:8080            │
└────────────────────────┴─────────────────────────────┘
```

### Auth Flow

```
App Start
    │
    ▼
┌───────────────┐    No token    ┌───────────────┐
│   index.tsx   │ ─────────────► │   /login       │
│  Check token  │                │  (auth group)  │
└───────┬───────┘                └───────┬────────┘
        │ Token found                    │ Submit credentials
        ▼                                ▼
┌───────────────┐                ┌───────────────┐
│   /habits     │ ◄───────────── │ POST /login   │
│   (Home)      │  Save token    │ -> JWT token  │
└───────────────┘  + redirect    └───────────────┘
```

**Token lifecycle:**

1. On login, JWT is saved to `expo-secure-store` (encrypted on device)
2. Zustand holds the token in-memory for the session
3. Axios interceptor auto-attaches `Bearer <token>` to every request
4. On logout, token is removed from secure store, user redirected to login

### Data Flow

```
┌──────────┐      ┌──────────────┐      ┌──────────────┐      ┌───────────┐
│  Screen  │      │     Hook     │      │      API     │      │  Backend  │
└────┬─────┘      └──────┬───────┘      └──────┬───────┘      └────┬──────┘
     │                   │                     │                   │
     │ useHabits()       │                     │                   │
     ├──────────────────►│ queryFn()           │                   │
     │                   ├────────────────────►│ GET /habits       │
     │                   │                     ├──────────────────►│
     │                   │                     │                   │
     │                   │                     │      JSON         │
     │                   │                     │◄──────────────────┤
     │                   │◄────────────────────┤                   │
     │◄──────────────────┤ Habit[]             │                   │
     │                   │                     │                   │
     │ markDone()        │                     │                   │
     ├──────────────────►│ mutationFn()        │                   │
     │                   ├────────────────────►│ POST /mark        │
     │                   │                     ├──────────────────►│
     │                   │                     │                   │
     │                   │                     │   200 / 409       │
     │                   │                     │◄──────────────────┤
     │                   │◄────────────────────┤                   │
     │◄──────────────────┤ onSuccess()         │                   │
     │ invalidateQueries │                     │                   │
```

React Query manages caching and refetching. After a successful mutation, relevant query keys are invalidated so the UI refreshes automatically.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- iOS Simulator or Android Emulator (or Expo Go on a physical device)
- Backend server running on `localhost:8080`

### Install and Run

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start

# Or target a specific platform
npx expo start --ios
npx expo start --android
```

---

## Key Design Decisions

- **Expo Secure Store** for JWT storage -- encrypted at rest, not plain AsyncStorage
- **React Query** for server state -- automatic caching, background refetch, and mutation invalidation keep the UI in sync without manual state management
- **Zustand** for auth only -- minimal footprint; all server data lives in React Query
- **File-based routing** via Expo Router -- route groups `(auth)` and `habits` cleanly separate public vs authenticated screens
- **react-native-chart-kit** ContributionGraph -- GitHub-style activity heatmap out of the box
