@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\Josef\Documents\Github\ReSight\website
rmdir /s /q node_modules 2>nul
call "C:\Program Files\nodejs\npm.cmd" install
