import React from "react";
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { Col, lightBlue, Row, styles } from "./components/Grid";

export const ComparePDF: React.FC<{ selectedPlans: any; names: any }> = ({
  selectedPlans,
  names,
}) => {
  Font.registerHyphenationCallback((words) => {
    return [words];
  });

  return (
    <Document>
      {Object.keys(selectedPlans).map((categoryName: string, index: number) => (
        <Page orientation="landscape" style={styles.page}>
          <View style={styles.container}>
			
            <Row>
              <Col>
                <View style={styles.page_header}>
                  <Text>Comparativo de Beneficios</Text>
                  <Text style={{ fontSize: 12, marginTop: 2 }}>
                    Fecha: {new Date().toLocaleDateString()}
                  </Text>
                </View>
              </Col>
            </Row>
            <View style={{ borderWidth: 1, marginTop: 15, fontSize: 12 }}>
              <Row>
                <Col
                  style={{
                    backgroundColor: lightBlue,
                    color: "white",
                    padding: 7,
                    textAlign: "center",
                  }}
                >
                  <Text>{categoryName}</Text>
                </Col>
              </Row>

              <Row style={{ borderWidth: 1, padding: 5 }}>
                <Col>
                  <Text>Beneficio</Text>
                </Col>
                {names.p1[0] && (
                  <Col>
                    <View style={{ flexDirection: "column" }}>
                      <Text>{names.p1[0]}</Text>
                    </View>
                  </Col>
                )}
				{names.p2[0] && (
                  <Col>
                    <View style={{ flexDirection: "column" }}>
					<Text>{names.p2[0]}</Text>
                    </View>
                  </Col>
                )}
				{names.p3[0] && (
                  <Col>
                    <View style={{ flexDirection: "column" }}>
					<Text>{names.p3[0]}</Text>
                    </View>
                  </Col>
                )}
              </Row>

              {Object.keys(selectedPlans[categoryName as any]).map(
                (benefitName: string, index: number) => (
                  <Row style={{ borderWidth: 1, padding: 5 }}>
                    <Col>
                      <Text>{benefitName}</Text>
                    </Col>
                    {selectedPlans[categoryName as any][benefitName].map(
                      (benefit: string, i: number) => (
                        <Col>
                          <View style={{ flexDirection: "column" }}>
                            {benefit.split("\\").map((s: string, k: number) => {
                              return <Text style={{ fontSize: 10 }}>{s}</Text>;
                            })}
                          </View>
                        </Col>
                      )
                    )}
                  </Row>
                )
              )}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};
