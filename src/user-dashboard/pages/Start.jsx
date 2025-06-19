import { Grid, TextField, useMediaQuery, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { states } from "../../constant";
import OneStopPricing from "../../website/components/OneStopPricing";

export default function Start() {


    useEffect(() => {
        states.shift()
    }, [])

    const [selectedState, setSelectedState] = useState(null);
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

    const handleStateSelect = (event, newValue) => {
        const start = window.scrollY;
        const end = 300;
        const duration = 500;

        const startTime = performance.now();

        const animateScroll = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(0, start + progress * (end - start));

            if (progress < 1) {
                window.requestAnimationFrame(animateScroll);
            }
        };

        window.requestAnimationFrame(animateScroll);

        setSelectedState(newValue);
    };

    useEffect(() => {
        setSelectedState({ label: "Wyoming", fee: 102 },)
    }, [])

    return (
        <div style={{ marginTop: matches_md ? '0' : '4%', padding: matches_md ? '3%' : '' }}>
            <Grid container spacing={0} style={{ display: 'flex', justifyContent: 'center', width: matches_md ? '100%' : '100%' }}>
                <div style={{ width: '100%', marginTop: matches_md ? '10%' : '0', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid container spacing={0} style={{ margin: 0 }}>
                        <Grid item xs={12}>
                            <center>
                                <h2 className='featuresHeading' style={{ fontSize: matches_md ? '35px' : '45px' }}>Simplified<span className='gradientText'> Pricing </span>for all your needs</h2>
                                <p className='featuresPara' style={{ marginTop: '1%', marginBottom: '1%' }}>Get upfront, clear pricing for starting and running your business.</p><br />
                            </center>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} style={{ display: 'flex', justifyContent: 'center', width: matches_md ? '90%' : '20%' }}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={states}
                                value={selectedState}
                                onChange={handleStateSelect}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <div>
                                            {option.label} <em>{option.tagline}</em>
                                        </div>
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Select state" />}
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={0} style={{ margin: matches_md ? '6% 0 0' : 0 }}>
                        <Grid item xs={matches_md ? 12 : 10} style={{ margin: 'auto', width: '100%' }}>
                            {
                                selectedState ?
                                    <>
                                        <OneStopPricing screen='pricing' selectedState={selectedState} />
                                    </>
                                    : <></>
                            }
                        </Grid>
                    </Grid>

                </div>
            </Grid>
        </div>
    )
}