import { useRouter } from 'next/router';

function Plot() {
    const router = useRouter();

    // Access query parameters using router.query
    const { labels, values } = router.query;


    return (

        <>

            <body onLoad={Make(labels, values)}>

                <canvas id="myChart" width="400" height="400"></canvas>

            </body>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="../lib/back.js"></script>

        </>


    );
}

export default Plot;