import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const finansingRequirements = `CHECK LIST PARA ANALISIS DE PERSONA FISICA

• 3 ULTIMOS ESTADOS DE CUENTA BANCARIOS o RECIBOS DE NOMINA
✓ COMPLETOS (todas las hojas incluyendo publicidad)
*En caso de presentar recibos quincenales se deben presentar los últimos 6

• COMPROBANTE DE DOMICILIO
✓ NO MAYOR A 60 DIAS
✓ TELEFONIA FIJA (todas las hojas incluyendo codigo QR)
*En caso de no contar con telefonía fija, se puede ingresar un comprobante de Domicilio de Servicio Público + Un estado de cuenta de Telefonía Celular a nombre de la persona que solicita el crédito)
*En caso de que el comprobante de telefonía fija no cuente con código QR también deberá complementarse con uno de servicios con este código.

• IFE / PASAPORTE VIGENTE
*Las personas con nacionalidad extranjera deben complementar con Forma migratoria

• CONSTANCIA DE SITUACION FISCAL
✓ NO MAYOR A 90 DIAS
✓ CON TODAS LAS HOJAS

TODOS LOS DOCUMENTOS DEBERAN SER ENTREGADOS EN FORMATO PDF, YA SEA ESCANEADOS A COLOR O EN EL CASO QUE APLIQUE, DESCARGADO DEL PORTAL.

NOTA: LA FINANCIERA NO ACEPTA FOTOGRAFIAS NI ARCHIVOS ESCANEADOS CON APLICACIONES DE CELULAR, LOS DOCUMENTOS SE REQUIEREN DIGITALIZADOS EN ESCANER TRADICIONAL.`;

export function FinancingRequirements() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(finansingRequirements);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Error copying:", err);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-4 px-6 rounded-2xl text-sm font-medium transition-all duration-300"
          style={{
            background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #f97316) border-box",
            border: "2px solid transparent",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" />
            Ver los requisitos para el financiamiento bancario
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Requisitos para Financiamiento Bancario</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-secondary transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
{finansingRequirements}
                </pre>
              </div>

              <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="hero" onClick={copyToClipboard}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copiar requisitos
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}