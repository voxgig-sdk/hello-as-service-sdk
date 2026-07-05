# frozen_string_literal: true

# Typed models for the HelloAsService SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetGreeting entity data model.
#
# @!attribute [rw] cc
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] hello
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
GetGreeting = Struct.new(
  :cc,
  :code,
  :hello,
  :ip,
  keyword_init: true
)

# Request payload for GetGreeting#load.
#
# @!attribute [rw] cc
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] hello
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
GetGreetingLoadMatch = Struct.new(
  :cc,
  :code,
  :hello,
  :ip,
  keyword_init: true
)

