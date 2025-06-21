import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TextField,
  Select,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast from 'react-hot-toast';

const roles = [
  'Owner', 'Manager', 'Employee', 'CEO', 'CRO', 'Head of Partnership', 'Shareholder', 'Ops Manager', 'Director', 'Supervisor',
  'Coordinator', 'Team Lead', 'Analyst', 'Consultant', 'Engineer',
  'Designer', 'Developer', 'Marketing Specialist', 'Sales Representative',
  'Customer Support', 'Human Resources', 'Finance', 'IT Administrator',
  'Quality Assurance', 'Operations',
];

export default function Step2({ members, setMembers, onPrev, onNext, isResponsible, setIsResponsible }) {
  const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(members.length > 0 ? members[0].id : false);

  const handleError = (memberId, error, label) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, errors: { ...member.errors, [label]: error } } : member
      )
    );
  };

  const validation = (member) => {
    let error = false;
    const { firstName, lastName, roleInCompany, phoneNumber, address, file } = member;

    if (!firstName.trim()) {
      error = true;
      handleError(member.id, 'Please input First Name', 'firstName');
    }
    if (!lastName.trim()) {
      error = true;
      handleError(member.id, 'Please input Last Name', 'lastName');
    }
    if (!roleInCompany.trim()) {
      error = true;
      handleError(member.id, 'Please input Role in Company', 'roleInCompany');
    }
    if (!phoneNumber.trim()) {
      error = true;
      handleError(member.id, 'Please input Phone Number', 'phoneNumber');
    }
    if (!address.trim()) {
      error = true;
      handleError(member.id, 'Please input Address', 'address');
    }

    // if (!file) {
    //   error = true;
    //   handleError(member.id, 'Please input Passport', 'passport');
    // }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = members.some((member) => validation(member));

    let isResponsibleCheck = false;

    members.forEach((member) => {
      if (member?.responsible_member) {
        isResponsibleCheck = true
      }
    })

    if (!isResponsibleCheck) {
      toast.error('Please select one member as responsible member')
      return
    }
    if (!hasError) {
      onNext({ members, member: true }); // Proceed to the next step only if there are no validation errors
    }
  };

  const handleMemberChange = (memberId, field, value) => {
    if (field === 'responsible_member') {
      members.forEach((member) => {
        if (member?.responsible_member) {
          member.responsible_member = false
        }
      })
    }

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, [field]: value } : member
      )
    );
  };


  const storeFileInIndexedDB = (memberId, file) => {
    const dbName = 'tempFileDB';
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');
      store.put({ id: memberId, file }); // Use memberId as the key
    };
  };



  const handleFile = (memberId, field, file) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, file: file } : member
      )
    );
    storeFileInIndexedDB(memberId, file);
  };

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      firstName: '',
      lastName: '',
      roleInCompany: '',
      phoneNumber: '',
      address: '',
      errors: {},
      responsible_member: false
    };
    setMembers([...members, newMember]);
    setExpanded(newMember.id);
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
    if (expanded === memberId && members.length > 1) {
      setExpanded(members[0].id);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const VisuallyHiddenInput = styled('input')({
  //   clip: 'rect(0 0 0 0)',
  //   clipPath: 'inset(50%)',
  //   height: 1,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: 'nowrap',
  //   width: 1,
  // });


  return (
    <div style={{ width: matches_md ? '90vw' : '100%', display: 'flex', justifyContent: 'center', maxHeight: '90vh', overflowY: 'auto', padding: 10 }}>
      <style>
        {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
      </style>
      <div style={{ width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <Grid item md={12} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 500 }}>Members Details</div>
            </div>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddMember}
              style={{ textTransform: 'capitalize', gap: 10, background: '#EA580C', color: 'white' }}
            >
              ADD
            </Button>
          </Grid>

          {members.map((member, index) => (
            <Accordion
              key={member.id}
              expanded={expanded === member.id}
              onChange={handleAccordionChange(member.id)}
              style={{ marginTop: '2%' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>Member {index + 1}</AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={4}>

                  <Grid item md={6} style={{ marginTop: '1%', width: '100%' }}>
                    <TextField
                      value={member.firstName}
                      onChange={(e) => handleMemberChange(member.id, 'firstName', e.target.value)}
                      label="Enter First Name"
                      onFocus={() => handleError(member.id, '', 'firstName')}
                      error={!!member?.errors?.firstName}
                      helperText={member?.errors?.firstName}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} style={{ marginTop: '1%', width: '100%' }}>
                    <TextField
                      value={member.lastName}
                      onChange={(e) => handleMemberChange(member.id, 'lastName', e.target.value)}
                      label="Enter Last Name"
                      onFocus={() => handleError(member.id, '', 'lastName')}
                      error={!!member?.errors?.lastName}
                      helperText={member?.errors?.lastName}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6}>
                    <PhoneInput
                      country={'us'}
                      value={member.phoneNumber}
                      onChange={(phone) => {
                        handleMemberChange(member.id, 'phoneNumber', phone);
                        if (!phone) {
                          handleError(member.id, 'Please input Phone Number', 'phoneNumber');
                        } else {
                          handleError(member.id, '', 'phoneNumber');
                        }
                      }}
                      onBlur={() => {
                        if (!member.phoneNumber) {
                          handleError(member.id, 'Please input Phone Number', 'phoneNumber');
                        }
                      }}
                      inputStyle={{ width: '100%' }}
                    />
                    {member?.errors?.phoneNumber && (
                      <div style={{ color: '#EA580C', fontSize: 12 }}>{member?.errors?.phoneNumber}</div>
                    )}
                  </Grid>
                  <Grid item md={6} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                      <InputLabel id={`role-select-label-${member.id}`}>Role in Company</InputLabel>
                      <Select
                        labelId={`role-select-label-${member.id}`}
                        value={member.roleInCompany}
                        label="Role in Company"
                        onChange={(e) => handleMemberChange(member.id, 'roleInCompany', e.target.value)}
                        onFocus={() => handleError(member.id, '', 'roleInCompany')}
                        error={!!member?.errors?.roleInCompany}
                      >
                        {roles.map((item, idx) => (
                          <MenuItem key={idx} value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {member?.errors?.roleInCompany && (
                      <div style={{ color: '#EA580C', fontSize: 12 }}>{member?.errors?.roleInCompany}</div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type='text'
                      multiline
                      rows={4}
                      value={member?.address}
                      onChange={(e) => handleMemberChange(member.id, 'address', e.target.value)}
                      onFocus={() => handleError(member.id, '', 'address')}
                      error={!!member?.errors?.address}
                      helperText={member?.errors?.address}
                      label="Enter Your Residential Address"
                      fullWidth
                    />
                  </Grid>


                  <Grid item xs={6} style={{ display: member?.errors?.passport ? '' : 'flex', flexDirection: 'column' }}>
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      style={{ textTransform: 'capitalize', border: '1px dashed #000', color: '#000', boxShadow: 'none', width: 'fit-content' }}
                      onFocus={() => handleError(member.id, '', 'passport')}
                    >
                      Upload Passport
                      <input type="file" hidden onChange={(e) => handleFile(member.id, 'passport', e.target.files[0])} />
                    </Button>

                    <div style={{ marginLeft: '2%', alignSelf: 'center' }}>{member?.file?.name}</div>
                    {member?.errors?.passport && (
                      <div style={{ color: '#EA580C', fontSize: 12 }}>{member?.errors?.passport}</div>
                    )}
                  </Grid>


                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={member?.responsible_member} onChange={(e) => handleMemberChange(member.id, 'responsible_member', e.target.checked)} />} label="Responsible Member" />
                    </FormGroup>
                  </Grid>


                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => handleDeleteMember(member.id)} style={{ color: '#EA580C' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4%' }}>
            {/* <Button
              startIcon={<KeyboardBackspaceIcon />}
              onClick={onPrev}
              style={{ textTransform: 'capitalize', background: 'black', color: 'white' }}
            >
              Back
            </Button>
            <Button
              type="submit"
              endIcon={<EastIcon />}
              style={{ textTransform: 'capitalize', background: '#EA580C', color: 'white' }}
            >
              Next
            </Button> */}

            <Button startIcon={<KeyboardBackspaceIcon />} onClick={onPrev} style={{ background: 'black', color: 'white', margin: '44px 0px 44px', borderRadius: '50px', padding: '1% 3%' }}>
              Back
            </Button>
            <Button endIcon={<EastIcon />} onClick={handleSubmit} style={{ background: '#EA580C', color: 'white', margin: '44px 0px 44px auto', borderRadius: '50px', padding: '1% 3%' }}>
              Next
            </Button>

          </Grid>
        </form>
      </div>
    </div>
  );
}
