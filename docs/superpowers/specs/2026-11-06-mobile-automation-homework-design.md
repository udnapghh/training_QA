# Mobile automation homework design

## Goal

Extend the existing WebdriverIO/Appium project to automate the Sauce Labs sample
Android app. The suite will cover successful login, failed login, sorting
products by price from low to high, and logout.

## Structure and behavior

- Keep the current `test/actions`, `test/pageobjects`, and `test/specs`
  organization; add only the files needed for test data, shared app helpers,
  and hooks.
- Store the valid `standard_user` credentials and a deliberately invalid login
  pair under `test_data`.
- Keep screen selectors and screen-specific operations in page objects/actions.
  Shared waits and other reusable app-level operations belong in `app_helper`.
- Isolate each scenario by starting from a clean app state and logging in as
  needed. The failed-login scenario must assert the visible error feedback and
  remain on the login screen. The sorting scenario must verify the displayed
  product prices are ascending. The logout scenario must verify return to the
  login screen.
- Resolve the APK from the project directory rather than an absolute
  developer-specific path, and run a single emulator session at a time.

## Hooks and reporting

- Add WebdriverIO hooks to initialize per-test state and capture a screenshot
  when a test fails; keep the original test failure visible in the run result.
- Preserve the terminal spec reporter and add Allure reporting with results
  written to a local `allure-results` directory.
- Provide package scripts for running the suite and generating/opening the
  Allure report.
- Save terminal and browser-report evidence locally. Prepare a PDF that groups
  the evidence with the GitHub/GitLab project link after a remote URL exists.
  Do not submit to the LMS or claim a repository URL without the user's account
  and remote details.

## Validation

- Run the four mobile scenarios against the supplied APK and verify the terminal
  summary and Allure results.
- Verify failed tests produce screenshots and do not conceal their failure.
- Confirm generated local evidence and PDF are readable before delivery.

## Constraints

The workspace currently has no Git repository or remote. Repository creation,
push, and inclusion of a valid hosted URL in the PDF depend on configuring a
GitHub/GitLab remote and authenticated access. Emulator execution also depends
on an available Android emulator and Appium/UiAutomator2 setup.
