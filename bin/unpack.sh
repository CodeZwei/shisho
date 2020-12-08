#!/bin/bash

downloadLocation=~/Downloads/shisho-downloads
storageLocation=~/.shisho

cd $storageLocation
tar xf default.tar.gz -C $downloadLocation
rm default.tar.gz
