#!/bin/bash

downloadLocation=~/Downloads/shisho-downloads
storageLocation=~/.shisho

cd $downloadLocation
tar czf default.tar.gz *
mv default.tar.gz $storageLocation
rm -rf *
