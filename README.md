# PicLash

## Installation

To install project locally, make sure to have NodeJS (version 16.13.0 at least) and Yarn (version 1.22.17 at least) installed.

* Clone the project `git@github.com:Mazzzoni/memory-cards.git`
* Enter project `cd memory-cards/`
* Install dependencies `yarn`
* Start dev environment for client `yarn start:dev:client`
* Start dev environment for server `yarn start:dev:server`

## Stack

### Yarn Workspaces

Project makes use of Yarn `workspaces` to manage client and server projects but also to share some code between both.

### Next.js / React.js

Client application is built on top of Next.js.

### NestJS / NodeJS

Server side is built using NestJS to manage game instances and handle interactions with clients.

### Socket.IO

To handle realtime, project uses websockets and manage socket connections with Socket.IO.

### Docker

For deployment, I use docker containers (using Alpine NodeJS images for client and server).

## Credits

Based off https://github.com/Mazzzoni/memory-cards by [Mazzoni](https://github.com/Mazzzoni)
