# HelloAsService SDK utility: feature_add
module HelloAsServiceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
