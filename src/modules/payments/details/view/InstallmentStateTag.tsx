import { Tag, TagLevel } from "@/src/shared/view/ui-kit/components/Tag/Tag";
import { InstallmentState } from "../../shared/domain/payment.types";
import { msg } from "@lingui/core/macro";
import { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react";

type Props = {
  installmentState: InstallmentState;
};

const translations: Record<InstallmentState, MessageDescriptor> = {
  pending: msg({
    id: "payment.installment.state.pending",
    message: "Pending",
  }),
  paid: msg({
    id: "payment.installment.state.paid",
    message: "Paid",
  }),
};

const levels: Record<InstallmentState, TagLevel> = {
  pending: "primary",
  paid: "success",
};

export const InstallmentStateTag = ({ installmentState }: Props) => {
  const { _ } = useLingui();
  return (
    <Tag
      label={_(translations[installmentState])}
      level={levels[installmentState]}
    />
  );
};
