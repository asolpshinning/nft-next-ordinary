import { Text } from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import React, { useMemo, useState } from "react";
import { Hint, RadialChart } from "react-vis";

export const SplitsPieChart = ({
  recipients,
}) => {
  const [hoverValue, setHoverValue] = useState();

  const totalShares = recipients.reduce((acc, cur) => {
    return acc + cur.sharesBps;
  }, 0);

  const offsetToFull = totalShares - 10_000;

  const finalSlices = useMemo(() => {
    let slices = recipients;

    slices = slices.concat({
      address: "",
      sharesBps: offsetToFull < 0 ? Math.abs(offsetToFull) : 0,
      _isFiller: true,
    });

    return slices;
  }, [offsetToFull, recipients]);

  return (
    <RadialChart
      data={finalSlices.map((slice) => ({
        shares: slice.sharesBps,
        angle: slice.sharesBps,
        label: slice.address,
        _isFiller: slice._isFiller,
        style: slice._isFiller
          ? { fill: "rgba(0,0,0,.1)", stroke: "transparent" }
          : undefined,
      }))}
      width={300}
      height={300}
      innerRadius={100}
      radius={140}
      animation
      onValueMouseOver={(value) => setHoverValue(value)}
      onSeriesMouseOut={() => setHoverValue(undefined)}
    >
      {hoverValue && !hoverValue._isFiller && (
        <Hint
          align={{ horizontal: "auto", vertical: "auto" }}
          value={hoverValue}
        >
          <Card>
            <Text size="label.md">{hoverValue.label || "N/A"}</Text>
            <Text>{hoverValue.shares / 100}%</Text>
          </Card>
        </Hint>
      )}
    </RadialChart>
  );
};
