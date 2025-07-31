import { Tag, TagLevel } from "@/src/shared/view/ui-kit/components/Tag/Tag";
import { PaymentState } from "../../shared/domain/payment.types";
import { msg } from "@lingui/core/macro";
import { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react";

type Props = {
  paymentState: PaymentState;
};

const translations: Record<PaymentState, MessageDescriptor> = {
  in_progress: msg`In progress`,
  completed: msg`Completed`,
};

const levels: Record<PaymentState, TagLevel> = {
  in_progress: "primary",
  completed: "success",
};

export const PaymentStateTag = ({ paymentState }: Props) => {
  const { _ } = useLingui();
  return (
    <Tag label={_(translations[paymentState])} level={levels[paymentState]} />
  );
};
