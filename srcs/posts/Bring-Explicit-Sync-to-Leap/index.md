---
title: "Bring Explicit Sync to Leap"
layout: post
#comment: true
draft: true
created: 2024-07-31 10:51:39
categories:
  - 计算机
  - Linux
tags:
  - Linux
  - NVIDIA
  - Wayland
---
NVIDIA users used to be the missing part of Wayland world, but things change a lot after NVIDIA decides to support GBM like other GPU driver. While pure Wayland apps should work fine with NVIDIA GPU now, the biggest problem remaining is in Xwayland, which is used to keep compatibility with X11 apps on Wayland. For example, Google Chrome will flash frequently if maximized, the newly inserted character will show and hide while typing in Slack then you cannot see it, DaVinci Resolve will flash black frame on widget update.

The reason why this only happens with NVIDIA GPU and driver is about implicit/explicit sync. On modern desktop, apps ask GPU to render a frame for it, and then submit the frame to compositor, then compositor collects frames of all apps and ask GPU to render the whole desktop with them. To improve performance, GPU won't let app waiting for rendering, but tell app "frame is done" instantly and doing job at it's own pace. That's why we need synchronization here: before compositor ask GPU to render the whole desktop, all frames of apps must be really rendered by GPU.

Traditionally on Linux desktop this synchronization happens implicitly, which means kernel and driver will delay compositor jobs until all app jobs finished. This makes writing apps and compositors easier, but also leads into other problems, for example if an app's frame takes very long time to render, the whole desktop frame will be slow down by it, because compositor can do nothing for this with implicit sync, the driver just delay it. Intel/AMD drivers support implicit sync, but NVIDIA driver does not support implicit sync and suggest to do synchronization explicitly. Which means apps can tell whether a frame is really done and compositor can choose previous frame so it won't be slow down by a slow app, but compositor needs to manually handle that.

Previously NVIDIA driver has no implicit sync support and Wayland compositors has no explicit sync support, that's why many Xwayland apps flash/blink with NVIDIA driver: nothing protects you to get correct frame. NVIDIA developers added some hack in egl-wayland to make GPU wait before a frame is really done, but for Xwayland there is still nothing doing the synchronization. Then developers decide to bring explicit sync to Wayland, because it fits modern API like Vulkan and can improve experience and performance.

Bring explicit sync to Wayland requires changes in many different compoments, first a new Wayland protocol linux-drm-syncobj-v1 is created so compositors can do explicit sync with it, and then major Wayland compositors implement that protocol, and explicit sync is also added to X and implemented in Xwayland, so compositors can pick correct frame of Xwayland apps. As a NVIDIA user myself, I keep tracking those works and it takes years to finish, thanks to all developers working on this.

So if you are using a relatively new distribution like Tumbleweed which contains newer version of software that have explicit sync support, and using the newest NVIDIA driver, the Xwayland flashing problem should be fixed. However, distributions like Leap and SLE contains stable version of software, which do not support explicit sync. We value the desktop experience of stable version users, so we tried to backport explicit sync support to stable version, to fix the unusable flash on Xwayland apps.
