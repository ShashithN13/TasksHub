
# TasksHub

## Mobile Application Development - Practical Tutorial 07

TasksHub is a React Native mobile application developed using Expo.

### Features

1. Add tasks with a task name and description.
2. Store tasks locally using AsyncStorage.
3. Retrieve and display saved tasks on the Dashboard.
4. Trigger local notifications when a task is saved.
5. Save student name and student ID.
6. Select a profile image using Expo Image Picker.
7. Clear locally stored application data.

### Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage
- Expo Notifications
- Expo Image Picker
- MaterialCommunityIcons

### Installation

```bash
npm install
npx expo start
```

### Project Structure

```text
app/
  _layout.tsx
  add-task.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    profile.tsx
```

### Storage

AsyncStorage is used to persist task and student profile data locally.

### Author

Student Name: H.M.S.N.B HERATH
Student ID: PS/2022/150