import React, { useEffect, useState } from 'react';
import { object, string, bool } from 'prop-types';
import { Form, Button, Icon, notification, message } from 'antd';
import { fetch } from '@helper/fetch';
import moment from 'moment';
import { logout } from '@helper/googleSession';
import Router from 'next/router';

import { useIdentity } from '@context/profileContext';

import BasicInfo from './BasicInfo';
import Profesi from './Profesi';
import Social from './Social';
import Reference from './Reference';
import Keaktifan from './Keaktifan';
import Organisasi from './Organisasi';

import { styButtonSave, stySubmitWrapperButton } from './styles';

const DataDiri = (props) => {
  const { cookieLogin, isInPreview } = props;
  const {
    dataUser,
    Identity,
    Skill,
    SocialMedia,
    AlumniReference,
    FimActivity,
    OrganizationExperiences,
    setDataUser,
    loadingUserData,
    setStep,
    fetchDataFormCompleteness,
  } = useIdentity();

  const [isLoading, setIsLoading] = useState(loadingUserData);
  const [listCertificate, setListCertificate] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '1',
        url: '',
        status: 'done',
      },
    ],
  });
  const [orgNormalized, setOrgNormalized] = useState({});

  const { setFieldsValue, getFieldValue } = props.form;

  const redirectAfterSuccessLogout = () => {
    message.success('Berhasil Logout');
    Router.push('/');
  };

  const fetchDataProfile = async () => {
    setIsLoading(true);

    try {
      if (Identity) {
        setFieldsValue({
          firstName: Identity.firstName,
          lastName: Identity.lastName,
          bornPlace: Identity.bornPlace,
          bornDate: moment(Identity.bornDate || new Date(), 'YYYY-MM-DD'),
          gender: Identity.gender,
          cityAddress: Identity.cityAddress,
          provinceAddress: Identity.provinceAddress,
          address: Identity.address,
          bloodGroup: Identity.bloodGroup,
          religion: Identity.religion,
          hobby: Identity.hobby,
          phone: Identity.phone,
          emergencyPhone: Identity.emergencyPhone,
          photoUrl: Identity.photoUrl,
          ktpNumber: Identity.ktpNumber,
          institution: Identity.institution,
          occupation: Identity.occupation,
          reason: Identity.reason,
        });
      }

      if (Skill) {
        setFieldsValue({
          isAbleVideoEditing: Skill.isAbleVideoEditing,
          videoEditingPortofolioUrl: Skill.videoEditingPortofolioUrl,
        });

        const listCertNorm = [];

        Skill.firstCertificateUrl
          ? listCertNorm.push({
              uid: '1',
              url: Skill.firstCertificateUrl,
            })
          : null;
        Skill.secondCertificateUrl
          ? listCertNorm.push({
              uid: '2',
              url: Skill.secondCertificateUrl,
            })
          : null;
        Skill.thirdCertificateUrl
          ? listCertNorm.push({
              uid: '3',
              url: Skill.thirdCertificateUrl,
            })
          : null;

        setListCertificate((prevState) => {
          return {
            ...prevState,
            fileList: listCertNorm,
          };
        });
      }

      if (SocialMedia) {
        setFieldsValue({
          twitterUrl: SocialMedia.twitterUrl,
          instagramUrl: SocialMedia.instagramUrl,
          facebookUrl: SocialMedia.facebookUrl,
          websiteUrl: SocialMedia.websiteUrl,
          otherSiteUrl: SocialMedia.otherSiteUrl,
          reason: SocialMedia.reason,
        });
      }

      if (AlumniReference) {
        setFieldsValue({
          fullNameRef: AlumniReference.fullName,
          batchRef: AlumniReference.batch,
          phoneNumberRef: AlumniReference.phoneNumber,
          acquaintedSinceRef: AlumniReference.acquaintedSince,
          relationshipRef: AlumniReference.relationship,
        });
      }

      if (FimActivity) {
        setFieldsValue({
          responsibility: FimActivity.responsibility,
          roleActivity: FimActivity.role,
          durationActivity: FimActivity.duration,
          eventScaleActivity: FimActivity.eventScale,
          resultActivity: FimActivity.result,
        });
      }

      if (OrganizationExperiences) {
        let initialKey = [];
        let orgDuration = [];
        let orgEventScale = [];
        let orgReferencePerson = [];
        let orgResult = [];
        let orgRole = [];

        for (let index = 0; index < OrganizationExperiences.length; index++) {
          initialKey.push(index);
        }

        OrganizationExperiences.map((org) => {
          orgDuration.push(org.duration);
          orgEventScale.push(org.eventScale);
          orgReferencePerson.push(org.referencePerson);
          orgResult.push(org.result);
          orgRole.push(org.role);
        });

        setFieldsValue({
          organizations: initialKey,
          // orgDuration:orgDuration,
          // orgEventScale,
          // orgReferencePerson,
          // orgResult,
          // orgRole,
        });

        setOrgNormalized({
          organizations: initialKey,
          orgDuration,
          orgEventScale,
          orgReferencePerson,
          orgResult,
          orgRole,
        });
      }

      setIsLoading(false);
    } catch (error) {
      // Jika error auto logout
      logout({
        onLogoutSuccess: () => {
          redirectAfterSuccessLogout();
          notification.error({ message: `Berhasil Logout` });
        },
      });
      setIsLoading(false);
    }
  };

  const saveBasicInfo = async (value) => {
    const response = await fetch({
      url: '/auth/profile/identity',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        emergencyPhone: value.emergencyPhone,
        ktpNumber: value.ktpNumber,
        photoUrl:
          typeof value.photoUrl === 'string'
            ? value.photoUrl
            : value.photoUrl.file.response.secure_url,
        religion: value.religion,
        bornPlace: value.bornPlace,
        bornDate: moment(value.bornDate || new Date(), 'YYYY-MM-DD'),
        address: value.address,
        cityAddress: value.cityAddress,
        provinceAddress: value.provinceAddress,
        gender: value.gender,
        bloodGroup: value.bloodGroup,
        hobby: value.hobby,
        institution: value.institution,
        occupation: value.occupation,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({ message: `Gagal menyimpan data diri: ${message}` });
    }
  };

  const saveSkills = async (value) => {
    const response = await fetch({
      url: '/auth/profile/skill',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        isAbleVideoEditing: value.isAbleVideoEditing,
        videoEditingPortofolioUrl: value.videoEditingPortofolioUrl,
        firstCertificateUrl: listCertificate.fileList[0]
          ? listCertificate.fileList[0].url
          : null,
        secondCertificateUrl: listCertificate.fileList[1]
          ? listCertificate.fileList[1].url
          : null,
        thirdCertificateUrl: listCertificate.fileList[2]
          ? listCertificate.fileList[2].url
          : null,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({
        message: `Gagal menyimpan data Profesi: ${message}`,
      });
    }
  };

  const saveSocialMedia = async (value) => {
    const response = await fetch({
      url: '/auth/profile/social-media',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        instagramUrl: value.instagramUrl,
        twitterUrl: value.twitterUrl,
        facebookUrl: value.facebookUrl,
        websiteUrl: value.websiteUrl,
        otherSiteUrl: value.otherSiteUrl,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({
        message: `Gagal menyimpan data Social Media:  ${message}`,
      });
    }
  };

  const saveReference = async (value) => {
    const response = await fetch({
      url: '/auth/profile/alumni-reference',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        fullName: value.fullNameRef,
        batch: value.batchRef,
        phoneNumber: value.phoneNumberRef,
        relationship: value.relationshipRef,
        acquaintedSince: value.acquaintedSinceRef,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({
        message: `Gagal menyimpan data Referensi FIM: ${message}`,
      });
    }
  };

  const saveFimActivity = async (value) => {
    const response = await fetch({
      url: '/auth/profile/fim-activity',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        responsibility: value.responsibility,
        role: value.roleActivity,
        duration: value.durationActivity,
        eventScale: value.eventScaleActivity,
        result: value.resultActivity,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({
        message: `Gagal menyimpan data aktivitas FIM: ${message}`,
      });
    }
  };

  const saveOrganization = async (value) => {
    const countOrg = getFieldValue('organizations');
    const normalizer = countOrg.map((key) => {
      return {
        referencePerson: value.orgReferencePerson[key],
        role: value.orgRole[key],
        duration: value.orgDuration[key],
        eventScale: value.orgEventScale[key],
        result: value.orgResult[key],
      };
    });

    if (normalizer.length > 0) {
      const response = await fetch({
        url: '/auth/profile/organization-experience',
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: normalizer,
      });

      const { status, message } = response.data;

      if (!status) {
        notification.error({
          message: `Gagal menyimpan data organisasi: ${message}`,
        });
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        Promise.all([
          saveBasicInfo(values),
          saveSkills(values),
          saveSocialMedia(values),
          saveReference(values),
          saveFimActivity(values),
          saveOrganization(values),
        ])
          .then(() => {
            setStep(2);
            fetchDataFormCompleteness('refetch');
          })
          .catch((error) => {
            console.error(error);
            notification.error({ message: 'Gagal Menyimpan Data' });
          });
      }
    });
  };

  useEffect(() => {
    fetchDataProfile();
  }, [
    dataUser,
    Identity,
    Skill,
    SocialMedia,
    AlumniReference,
    FimActivity,
    OrganizationExperiences,
  ]);

  return (
    <Form onSubmit={handleSubmitForm}>
      <BasicInfo
        {...props}
        isLoading={isLoading}
        dataUser={dataUser}
        setDataUser={setDataUser}
      />
      <Profesi
        {...props}
        isLoading={isLoading}
        dataUser={dataUser}
        listCertificate={listCertificate}
        setListCertificate={setListCertificate}
      />
      <Social {...props} isLoading={isLoading} />
      <Reference {...props} isLoading={isLoading} />
      <Keaktifan {...props} isLoading={isLoading} />
      <Organisasi
        {...props}
        isLoading={isLoading}
        orgNormalized={orgNormalized}
      />

      {!isInPreview && (
        <div css={stySubmitWrapperButton}>
          <Form.Item>
            <Button
              size='large'
              css={styButtonSave}
              type='primary'
              htmlType='submit'
            >
              <Icon type='save' theme='filled' /> Simpan Perubahan
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'register' })(DataDiri);

DataDiri.propTypes = {
  form: object.isRequired,
  cookieLogin: string,
  isInPreview: bool,
};

export default WrappedRegistrationForm;
