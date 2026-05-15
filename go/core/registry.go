package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetGreetingEntityFunc func(client *HelloAsServiceSDK, entopts map[string]any) HelloAsServiceEntity

