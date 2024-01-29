<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=arco-design-solid&background=tiles&project=Monorepo" alt="arco-design-solid">
</p>

# Arco-design-solid (WIP)

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![turborepo](https://img.shields.io/badge/built%20with-turborepo-cc00ff.svg?style=for-the-badge&logo=turborepo)](https://turborepo.org/)

Awesome UI Components for solidjs based on Arco design.

## Supported components
- [x] Button
- [x] Input
- [x] Checkbox
- [x] Card
- [x] Divider
- [x] Empty
- [x] Avatar
- [x] Switch
- [x] Tag
- [x] Link
- [x] locale
- [x] style
- [x] InputNumber
- [x] Alert
- [x] Affix
- [x] Grid
- [x] Spin
- [x] ConfigProvider
- [x] Result
- [x] Skeleton
- [x] Steps
- [x] Statistic
- [x] VerificationCode
- [x] Backtop
- [x] Badge
- [x] Icon
- [x] Radio
- [ ] InputTag -- in progress
- [ ] Breadcrumb
- [ ] Image
- [ ] Rate
- [ ] Typograghy
- [ ] Descriptions
- [ ] List
- [ ] Upload
- [ ] CheckboxGroup
- [ ]
- [ ] Calendar
- [ ] Anchor
- [ ] Cascader
- [ ] Collapse
- [ ] Drawer
- [ ] Dropdown
- [ ] Form
- [ ] Datepicker
- [ ] Menu
- [ ] Message
- [ ] Modal
- [ ] Notification
- [ ] Pagination
- [ ] Popconfirm
- [ ] Popover
- [ ] Portal
- [ ] Progress
- [ ] Table
- [ ] Tabs
- [ ] Timeline
- [ ] Timepicker
- [ ] Tooltip
- [ ] Transfer
- [ ] Tree
- [ ] TreeSelect
- [ ] Layout
- [ ]
- [ ] Carousel
- [ ] Comment
- [ ] Mentions
- [ ] PageHeader
- [ ] ResizeBox
- [ ] Trigger
- [ ] Autocomplete
- [ ] Select
- [ ] Slider
- [ ] Watermark


## Quick start

Install it:

```bash
npm i arco-design-solid
# or
yarn add arco-design-solid
# or
pnpm add arco-design-solid
```


## Project Commands

List of cli commands available from a project root.

To use the commands, first install [pnpm](https://pnpm.io) and install dependencies with `pnpm i`.

```bash
pnpm run dev
# Builds all packages in watch mode, and starts all playgrounds
# turbo run dev --************pa**ra**ll**el**

pnpm run build
# Builds all the packages in the monorepo
# turbo run build --filter=!./playgrounds/*

pnpm run test
# Runs tests for all the packages in the monorepo
# turbo run test --filter=!./playgrounds/*

pnpm run typecheck
# Runs TS typecheck for all the packages in the monorepo
# turbo run typecheck --filter=!./playgrounds/*

pnpm run build-test
# Runs build, typecheck and test commands for all the packages in the monorepo
# "turbo run build test typecheck --filter=!./playgrounds/*

pnpm run format
# Formats the reposotory with prettier
# prettier -w \"packages/**/*.{js,ts,json,css,tsx,jsx,md}\" \"playgrounds/**/*.{js,ts,json,css,tsx,jsx,md}\"

pnpm run changeset
# Creates a changeset
# changeset

pnpm run version-packages
# Applies changesets to bump package versions and update CHANGELOGs
# "changeset version && pnpm i

pnpm run release
# Builds and publishes changed packages to npm
# pnpm run build-test && changeset publish

pnpm run update-deps
# Updates all dependencies in the repository
# pnpm up -Lri
```
