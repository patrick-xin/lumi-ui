import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/registry/ui/field";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@/registry/ui/fieldset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";
import { Textarea } from "@/registry/ui/textarea";

export function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <Fieldset>
            <FieldsetLegend>Payment Method</FieldsetLegend>
            <FieldsetDescription>
              All transactions are secure and encrypted
            </FieldsetDescription>
            <FieldGroup>
              <Field name="checkout-card-name">
                <FieldLabel>Name on Card</FieldLabel>
                <FieldControl placeholder="Evil Rabbit" required />
              </Field>
              <Field name="checkout-card-number">
                <FieldLabel>Card Number</FieldLabel>
                <FieldControl placeholder="1234 5678 9012 3456" required />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field name="checkout-exp-month">
                  <FieldLabel>Month</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field name="checkout-exp-year">
                  <FieldLabel>Year</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field name="checkout-cvv">
                  <FieldLabel>CVV</FieldLabel>
                  <FieldControl placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </Fieldset>

          <FieldSeparator />

          <Fieldset>
            <FieldsetLegend>Billing Address</FieldsetLegend>
            <FieldsetDescription>
              The billing address associated with your payment method
            </FieldsetDescription>
            <FieldGroup>
              <Field orientation="horizontal" name="checkout-same-as-shipping">
                <Checkbox defaultChecked />
                <FieldLabel className="font-normal">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </Fieldset>

          <Fieldset>
            <FieldGroup>
              <Field name="checkout-comments">
                <FieldLabel>Comments</FieldLabel>
                <Textarea
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </Fieldset>

          <div className="flex w-full gap-3">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
