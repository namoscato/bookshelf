import * as ReactRoughFiber from "react-rough-fiber";

// @ts-expect-error untyped default property handles server context: https://github.com/Bowen7/react-rough-fiber/issues/10
const RoughSVG = ReactRoughFiber.default?.RoughSVG || ReactRoughFiber.RoughSVG;

export function Welcome() {
  return (
    <RoughSVG>
      <svg viewBox="0 0 128 128" width="128" height="128">
        <circle cx={64} cy={64} r={48} stroke="currentColor" fill="#82ca9d" />
      </svg>
    </RoughSVG>
  );
}
