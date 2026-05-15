package = "voxgig-sdk-phone-number-validator"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/phone-number-validator-sdk.git"
}
description = {
  summary = "PhoneNumberValidator SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["phone-number-validator_sdk"] = "phone-number-validator_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
