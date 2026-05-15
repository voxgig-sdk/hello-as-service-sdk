# HelloAsService SDK feature factory

from feature.base_feature import HelloAsServiceBaseFeature
from feature.test_feature import HelloAsServiceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HelloAsServiceBaseFeature(),
        "test": lambda: HelloAsServiceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
