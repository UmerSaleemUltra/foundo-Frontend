import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const steps = [
    {
        label: 'Account Info',
        description: `Setup Your Account Details`,
    },
    {
        label: 'Business Info',
        description: 'Your Business Related Info',
    },
    {
        label: 'Members Details',
        description: 'Your Members Related Info',
    },
    {
        label: 'Addons (Additional Services)',
        description: 'Add extra services to your package',
    },
    {
        label: 'Summary',
        description: 'Check your shopping details',
    },
];

export default function VerticalLinearStepper({ step }) {

    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{ maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
            <Stepper activeStep={step} orientation={matches_sm || matches_md ? "horizontal" : "vertical"}>
                {steps?.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    matches_md || matches_sm ? <></>
                                        : <Typography variant="caption" style={{ color: 'black' }}>Last step</Typography>

                                ) : null
                            }
                        >
                            {matches_md || matches_sm ? <></>
                                :
                                <>
                                    {step.label}
                                    <Typography style={{ color: 'black' }} fontSize={14}>{step.description}</Typography>
                                </>
                            }
                        </StepLabel>
                        <StepContent>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
        </Box >
    );
}
