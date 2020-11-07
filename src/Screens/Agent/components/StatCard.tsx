import {
  faFileExcel,
  faFilePdf,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { QuotePDF } from "../../../pdf/Quote";
import { IQuoteStat } from "../../../types/store";
import { formatMoney } from "../../../utils/formatMoney";
import { downloadXls } from "../../../utils/utils";
import Axios from 'axios';
import { APIURL } from "../../../ducks/quoteReducer";
interface IProps {
  stat: IQuoteStat;
}


export const StatCard: React.FC<IProps> = ({ stat }) => {
  const redownloadQuote=()=>{
    Axios.post(APIURL + '/redownloadQuote', { plans:stat.quote.plans, params:stat.quote.params })
			.then((res) => {
				downloadXls(res.data.data,stat.name);
			})
			.catch((err) => {
				console.log(err);
			});
  }

  return (
    <Card className="h-100">
      <Card.Header className="d-flex flex-row justify-content-between align-items-center">
        <span>{stat.name}</span>
        <ButtonGroup size="sm">
          <PDFDownloadLink
            className="btn btn-sm btn-link"
            document={
              <QuotePDF plans={stat.quote.plans} params={stat.quote.params} />
            }
            fileName="cotizacion.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Cargando..."
              ) : (
                <FontAwesomeIcon
                  title="Descargar (PDF)"
                  size="lg"
                  color="white"
                  icon={faFilePdf}
                />
              )
            }
          </PDFDownloadLink>
          <Button variant="link" onClick={()=>redownloadQuote()}>
            <FontAwesomeIcon
              icon={faFileExcel}
              title="Descargar (Excel)"
              size="lg"
              color="white"
            />
          </Button>
          <Button variant="link">
            <FontAwesomeIcon
              icon={faTrashAlt}
              title="Eliminar"
              size="lg"
              color="white"
            />
          </Button>
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <Table size="sm" variant="bordered" style={{ fontSize: "0.8em" }}>
          <thead>
            <tr>
              <th>Fecha </th>
              <th className="text-right" colSpan={2}>
                {new Date(stat.created_at).toLocaleDateString()}
              </th>
            </tr>
            <tr>
              <th colSpan={3} className="text-center bg-secondary text-white">
                Edades
              </th>
            </tr>
            <tr>
              <td>Titular</td>
              <td>Pareja</td>
              <td># Hijos</td>
            </tr>
            <tr>
              <td>{stat.quote.params.main_age}</td>
              <td>{stat.quote.params.couple_age || "--"}</td>
              <td>{stat.quote.params.num_kids || "--"}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={3}>Planes</th>
            </tr>
            {stat.quote.plans.map((p) => {
              return (
                <tr>
                  <th colSpan={2}>{p.name}</th>
                  <th>{formatMoney(p.deductible)}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
