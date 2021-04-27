import React, { useState } from "react";
import { Input, Select } from "antd";

const { Option } = Select;

export type Currency = "rmb" | "dollar";

interface PriceValue {
  amount?: number;
  currency?: Currency;
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

export const AmountInput: React.FC<PriceInputProps> = ({
  value = {},
  onChange,
}) => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>("rmb");

  const triggerChange = (changedValue: {
    amount?: number;
    currency?: Currency;
  }): void => {
    if (onChange) {
      onChange({ amount, currency, ...value, ...changedValue });
    }
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newAmount = parseInt(e.target.value || "0", 10);
    if (Number.isNaN(amount)) {
      return;
    }
    if (!("amount" in value)) {
      setAmount(newAmount);
    }
    triggerChange({ amount: newAmount });
  };

  const onCurrencyChange = (newCurrency: Currency): void => {
    if (!("currency" in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.amount || amount}
        onChange={onAmountChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: "0 8px" }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RUB</Option>
      </Select>
    </span>
  );
};
