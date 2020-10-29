import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { formatMoney } from "../../../utils/formatMoney";
import { Rider } from "./Rider";
import BD from "../../../assets/img/icons/BD.png";
import VU from "../../../assets/img/icons/VU.png";
import BU from "../../../assets/img/icons/BU.png";
import AL from "../../../assets/img/icons/AL.png";
import { IPlan } from "../../../types/store";

type Itype = {
  [key: string]: string;
};

const images: Itype = {
  "Allianz Care": AL,
  "Bupa Salud": BU,
  "Best Doctors Insurance": BD,
  "Vumi Group": VU,
};

interface IProps {
  data: IPlan;
  name: string;
  addToCompare: Function;
}

const PlanCard: React.FC<IProps> = ({ data, name, addToCompare }) => {
  const [plan, setPlan] = useState<IPlan>(data);
  const [ded, setDed] = useState<number>(-1);
  const rate = plan.rates.find((x) => x.deductible === ded);

  const handleRiderSelection = (e: any, label: any, ded: any) => {
    if (label !== "Costo Administrativo") {
      if (e.target.checked) {
        plan.riders[label].selected.push(ded);
      } else {
        plan.riders[label].selected = plan.riders[label].selected.filter(
          (x: any) => x !== ded
        );
      }

      setPlan({ ...plan });
    }
  };
  const calculateTotal = () => {
    let total = 0;
    if (rate) {
      total = rate.yearly;
      if (rate.couple) {
        total = total + rate.couple;
      }
      if (rate.kids) {
        total = total + rate.kids;
      }
      Object.keys(plan.riders).forEach((r: any) => {
        if (plan.riders[r].selected.includes(ded)) {
          total = total + plan.riders[r].price;
        }
      });
    }
    return formatMoney(total, { decimalCount: 2 });
  };

  return (
    <Card className="plan-card h-100">
      <Card.Header className="p-2">
        <div
          style={{
            height: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={images[plan.company]} style={{ width: 48, height: 48 }} />
          <p className="mb-0" style={{ fontSize: "0.8em" }}>
            {name}
          </p>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="coverage-bg">
          <span>Cobertura Max:</span>
          <span> {plan.coverage}</span>
        </div>
        <div style={{ padding: 15 }}>
          <FormGroup size="sm" as={Row} className="mb-1">
            <FormLabel column xs={12} xl={6} className="form-control-sm">
              Deducible:
            </FormLabel>
            <Col xl={6} xs={12}>
              <FormControl
                value={ded}
                size="sm"
                as="select"
                onChange={({ target }) => setDed(parseInt(target.value))}
              >
                <option value="-1">...</option>
                {plan.rates
                  .map((rate) => rate.deductible)
                  .map((ded: number, k: number) => (
                    <option key={k} value={ded}>
                      {formatMoney(ded, { decimalCount: 0 })}
                    </option>
                  ))}
              </FormControl>
            </Col>
          </FormGroup>
          <div style={{ minHeight: 40, fontSize: "0.8em" }}>
            {Object.keys(plan.riders).map((r: any, k: number) => {
              return (
                <Rider
                  key={k}
                  label={r}
                  rider={plan.riders[r]}
                  ded={ded}
                  selected={plan.riders[r].selected.includes(ded)}
                  onChange={handleRiderSelection}
                />
              );
            })}
          </div>
        </div>
        <div className="text-center my-2">
          <Button
            onClick={() => {
              if (ded !== -1) {
                addToCompare(plan, name, ded, rate ? rate.deductible_out : 0);
              }
            }}
          >
            Comparar
          </Button>
        </div>
      </Card.Body>
      <Card.Footer>
        <p>Prima Total: {rate && calculateTotal()}</p>

        <Button variant="secondary" size="sm">
          Ver Desglose
        </Button>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(PlanCard);
