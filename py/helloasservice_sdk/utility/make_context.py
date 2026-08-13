# HelloAsService SDK utility: make_context

from helloasservice_sdk.core.context import HelloAsServiceContext


def make_context_util(ctxmap, basectx):
    return HelloAsServiceContext(ctxmap, basectx)
