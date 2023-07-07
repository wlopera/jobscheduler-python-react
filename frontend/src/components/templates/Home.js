import React from "react";

const Home = () => {
  const tab = '\u00A0';

  return (
    <div>
      <h1>PROCESAMIENTO TAREAS: PYTHON-REACT</h1>
      <br />
      <p>
        El JobScheduler es una solución de programación de código abierto para
        la automatización de procesos a nivel empresarial.
      </p>
      <p>
        JobScheduler se utiliza para iniciar archivos ejecutables en Python
        proporciona tareas secuenciales y cadenas de trabajo.
      </p>
      <p>
        JobScheduler cuenta con librerias parametrizables para copiar archivos
        FTP y SFTP y envio de correos.
      </p>
      <p>
        Se pueden agregar librerías Python personalisadas que permitan agregar
        tareas requeridas.
      </p>
      <br />
      <h5 style={{ backgroundColor: "#76ed6b" }}>{tab} Tareas</h5>
      <p>
        Modo de operación Jobs: Son la unidad básica para el procesamiento de
        archivos ejecutables.
      </p>
      <p>Se pueden ejecutar independientemente uno del otro.</p>
      <p>
        Dependiendo del resultado de la ejecución, es decir, código de salida
        que indica éxito, falla o un código de salida específico, se puede
        iniciar cualquier número de trabajos sucesivos.
      </p>
      <br />
      <h5 style={{ backgroundColor: "#76ed6b" }}>{tab} Cadenas de trabajo</h5>
      <p>
        Las cadenas de trabajo se pueden ver como una línea de ensamblaje en la
        que se pasan varios nodos de trabajo.
      </p>
      <p>
        Por lo tanto, cada trabajo comprende exactamente un paso en el
        procesamiento de una cadena de trabajo.
      </p>
      <p>
        Las dependencias de trabajo basadas en los resultados de ejecución de
        los nodos de trabajo respectivos se pueden configurar para una cadena de
        trabajo.
      </p>
      <p>
        Los trabajos ejecutan transferencias de archivos basadas en las
        capacidades incorporadas de FTP y SFTP como un medio generalizado para
        integrar aplicaciones.
      </p>
      <p>
        Los inicios de trabajo se activan mediante el calendario incorporado, la
        línea de comandos o la interfaz web.
      </p>
      <p>
        Otras aplicaciones pueden iniciar trabajos o controlar JobScheduler a
        través de archivos python.
      </p>
      <p>
        Se pueden ver como una línea de ensamblaje en la que se pasan varios
        nodos de trabajo, y cada trabajo constituye un paso en el procesamiento
        de una cadena.
      </p>
      <p>
        Permiten la reutilización de trabajos en diferentes cadenas de trabajo
        con diferentes conjuntos de parámetros.
      </p>
      <p>
        Permiten mapear dependencias, por ejemplo, haciendo que el procesamiento
        continúe en diferentes nodos de trabajo de acuerdo con el resultado
        devuelto del procesamiento de un nodo de trabajo.
      </p>
      <br />
      <h5 style={{ backgroundColor: "#76ed6b" }}>{tab} Ordenes</h5>
      <p>Son desencadenantes que harán que se inicie una cadena de trabajo.</p>
      <p>
        Los trabajos pueden iniciarse por eventos de calendario, eventos de
        archivo y por eventos creados mediante programación. Se pueden usar con
        parámetros que permiten usar la misma cadena de trabajo con diferentes
        conjuntos de parámetros.
      </p>
      <p>Los flujos de trabajo están regulados por órdenes.</p>
      <p>
        Una orden puede considerarse como una directiva que se procesa en una
        cadena de trabajos.
      </p>
      <p>
        Se asigna un pedido a una cadena de trabajo con un identificador que es
        válido para esa cadena de trabajo en particular.
      </p>
      <p>
        El pedido también tiene un estado que cambia después del procesamiento
        de cada nodo de trabajo y puede tener una carga útil de parámetros. Se
        almacenan de forma persistente durante el procesamiento.
      </p>
      <br />
      <h4>wlopera @2023</h4>
    </div>
  );
};

export default Home;
