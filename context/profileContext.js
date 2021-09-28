import React, {
  useContext,
  createContext,
  useState,
  // message,
  useEffect,
  notification,
  useCallback,
} from 'react';
import { node, string } from 'prop-types';
import { fetch } from '@helper/fetch';
// import { logout } from '@helper/googleSession';
// import Router from 'next/router';

export const IdentityContext = createContext();

const IdentityProvider = ({ children, cookieLogin }) => {
  const [dataUser, setDataUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [identity, setIdentity] = useState(null);
  const [skill, setSkill] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null);
  const [alumniReference, setAlumniReference] = useState(null);
  const [fimActivity, setFimActivity] = useState(null);
  const [organizationExperiences, setOrganizationExperiences] = useState([]);
  const [submitAllState, setSubmitAllState] = useState({
    loading: false,
    status: false,
  });

  const [step, setStep] = useState(1);

  const [formCompleteness, setFormCompleteness] = useState({
    isFirstStepCompleted: false,
    isFourthStepCompleted: false,
    isSecondStepCompleted: false,
    isThirdStepCompleted: false,
    progress: 0,
  });

  // const redirectAfterSuccessLogout = () => {
  //   message.success('Berhasil Logout');
  //   Router.push('/');
  // };

  const fetchDataProfile = async () => {
    setIsLoading(true);

    try {
      const response = await fetch({
        url: '/auth/profile',
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.data.status || false;
      if (!status) {
        setDataUser({});
      }

      const responseData = response.data.data;
      setDataUser(responseData);
      const {
        Identity,
        Skill,
        SocialMedia,
        AlumniReference,
        FimActivity,
        OrganizationExperiences,
      } = responseData;

      if (Identity) {
        setIdentity(Identity);
      }

      if (Skill) {
        setSkill(Skill);
      }

      if (SocialMedia) {
        setSocialMedia(SocialMedia);
      }

      if (AlumniReference) {
        setAlumniReference(AlumniReference);
      }

      if (FimActivity) {
        setFimActivity(FimActivity);
      }

      if (OrganizationExperiences) {
        setOrganizationExperiences(OrganizationExperiences);
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Gagal memuat data diri' });
      setIsLoading(false);
    }
  };

  const fetchDataFormCompleteness = useCallback(async (refetch) => {
    try {
      const response = await fetch({
        url: '/form-completeness',
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      if (response.data.status) {
        const {
          isFirstStepCompleted,
          isSecondStepCompleted,
          isThirdStepCompleted,
          isFourthStepCompleted,
          submittedAt,
        } = response.data.data;

        if (!refetch) {
          if (isFirstStepCompleted) {
            setStep(2);
          }

          if (isSecondStepCompleted) {
            setStep(3);
          }

          if (isThirdStepCompleted) {
            setStep(4);
          }

          if (isFourthStepCompleted) {
            setStep(5);
          }

          if (submittedAt) {
            setStep(5);
          }
        }

        setFormCompleteness(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onHandleAllSubmit = async () => {
    setSubmitAllState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const response = await fetch({
      url: '/form-completeness/submit',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
    });

    setSubmitAllState((prevState) => ({
      ...prevState,
      loading: false,
    }));

    const { status, message } = response.data;
    if (status) {
      setSubmitAllState((prevState) => ({
        ...prevState,
        status: true,
      }));

      fetchDataFormCompleteness('refetch');
    } else {
      notification.error({ message });
    }
  };

  useEffect(() => {
    fetchDataProfile();
    fetchDataFormCompleteness();
  }, []);

  const state = {
    dataUser,
    formCompleteness,
    loadingUserData: isLoading,
    Identity: identity,
    Skill: skill,
    SocialMedia: socialMedia,
    AlumniReference: alumniReference,
    FimActivity: fimActivity,
    OrganizationExperiences: organizationExperiences,
    setDataUser: setDataUser,
    fetchDataFormCompleteness,
    step,
    setStep,
    onHandleAllSubmit,
    submitAllState,
  };

  return (
    <IdentityContext.Provider value={state}>
      {children}
    </IdentityContext.Provider>
  );
};

IdentityProvider.propTypes = {
  children: node.isRequired,
  cookieLogin: string,
};

export const useIdentity = () => useContext(IdentityContext);
export default IdentityProvider;
