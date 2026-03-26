/**
 * @prettier
 */
import React from "react"
import { List, Map } from "immutable"
import { shallow } from "enzyme"
import OperationContainer from "core/containers/OperationContainer"

jest.mock("swagger-client/es/helpers", () => ({
  opId: () => "getPets",
}))

describe("<OperationContainer/>", function () {
  const getProps = () => ({
    op: Map({ operation: Map() }),
    tag: "pets",
    path: "/pets",
    method: "get",
    operationId: "getPets",
    showSummary: true,
    isShown: false,
    jumpToKey: "paths./pets.get",
    allowTryItOut: true,
    displayOperationId: false,
    isAuthorized: true,
    displayRequestDuration: false,
    response: null,
    request: null,
    security: List(),
    isDeepLinkingEnabled: false,
    specPath: List(["paths", "/pets", "get"]),
    getComponent: () => "div",
    authActions: {},
    oas3Actions: {
      setRequestBodyValue: jest.fn(),
    },
    oas3Selectors: {
      selectDefaultRequestBodyValue: jest.fn(),
      requestContentType: jest.fn(),
    },
    authSelectors: {},
    specActions: {
      requestResolvedSubtree: jest.fn(),
    },
    specSelectors: {
      specResolvedSubtree: () => Map({}),
      url: () => "https://example.test/openapi.json",
    },
    layoutActions: {
      show: jest.fn(),
    },
    layoutSelectors: {},
    fn: {},
    getConfigs: () => ({
      tryItOutEnabled: true,
    }),
  })

  it("aborts an in-flight request when cancel is clicked", function () {
    const wrapper = shallow(<OperationContainer {...getProps()} />)

    const { abortSignal } = wrapper.instance().onExecute()

    expect(abortSignal.aborted).toEqual(false)
    expect(wrapper.state("executeInProgress")).toEqual(true)

    wrapper.instance().onCancelClick()

    expect(abortSignal.aborted).toEqual(true)
    expect(wrapper.state("executeInProgress")).toEqual(false)
    expect(wrapper.state("abortController")).toEqual(null)
    expect(wrapper.state("tryItOutEnabled")).toEqual(true)
  })

  it("keeps the existing try it out toggle behavior when no request is running", function () {
    const wrapper = shallow(<OperationContainer {...getProps()} />)

    wrapper.instance().onCancelClick()

    expect(wrapper.state("tryItOutEnabled")).toEqual(false)
  })
})
