export function assertPropsInResult<
  TProps,
  TPropsResult extends { props: TProps },
>(result: Record<string, unknown>): asserts result is TPropsResult {
  if (!('props' in result)) {
    throw new Error(
      `No props in result. Found these keys instead: ${Object.keys(result)}`,
    )
  }
}
