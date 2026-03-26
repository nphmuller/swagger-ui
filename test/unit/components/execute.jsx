/**
 * @prettier
 */
import React from "react"
import { shallow } from "enzyme"
import Execute from "core/components/execute"

describe("<Execute/>", function () {
  const getProps = () => ({
    specSelectors: {
      validateBeforeExecute: () => true,
      getOAS3RequiredRequestBodyContentType: () => null,
    },
    specActions: {
      validateParams: jest.fn(),
      execute: jest.fn(),
      clearValidateParams: jest.fn(),
    },
    operation: {},
    path: "/pets",
    method: "get",
    oas3Selectors: {
      requestBodyValue: jest.fn(),
      validateBeforeExecute: () => true,
      requestContentType: jest.fn(),
      validateShallowRequired: jest.fn(),
    },
    oas3Actions: {
      clearRequestBodyValidateError: jest.fn(),
      setRequestBodyValidateError: jest.fn(),
    },
  })

  it("passes onExecute extras through to specActions.execute", function () {
    const props = getProps()
    props.onExecute = jest.fn(() => ({
      abortSignal: "abort-signal",
    }))

    const wrapper = shallow(<Execute {...props} />)

    wrapper.find("button.execute").simulate("click")

    expect(props.onExecute).toHaveBeenCalledTimes(1)
    expect(props.specActions.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: props.operation,
        path: props.path,
        method: props.method,
        abortSignal: "abort-signal",
      })
    )
  })
})
